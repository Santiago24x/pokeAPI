const API_ENDPOINT = 'https://650b8803dfd73d1fab0a0b24.mockapi.io/pokemon_data';
const listaPokemon = document.querySelector("#listaPokemon");
const cambiosStats = {};

async function obtenerUrls(cantidad, tipo = null) {
    let URL;
    if (tipo) {
        URL = `https://pokeapi.co/api/v2/type/${tipo}`;
    } else {
        URL = `https://pokeapi.co/api/v2/pokemon/?limit=${cantidad}`;
    }

    const respuesta = await fetch(URL);
    const datos = await respuesta.json();

    if (tipo) {
        return datos.pokemon.map(pokemon => pokemon.pokemon.url);
    } else {
        return datos.results.map(pokemon => pokemon.url);
    }
}

async function mostrarDatos(cantidad, tipo = null) {
    const listaPokemones = document.getElementById('listaPokemon');
    listaPokemones.innerHTML = ''; // Limpiamos la lista antes de agregar nuevos elementos

    const urls = await obtenerUrls(cantidad, tipo);

    const obtenerDatos = async (url) => {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        mostrarPokemon(datos);
    };

    urls.forEach(obtenerDatos);
}

async function guardarCambiosEnAPI(id, cambiosStats) {
    const url = `https://650b8803dfd73d1fab0a0b24.mockapi.io/pokemon_data/${id}`;
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cambiosStats)
    });
    const data = await response.json();
    return data;
}


async function guardarDatosMockAPI(datos) {
    const url = `https://650b8803dfd73d1fab0a0b24.mockapi.io/pokemon_data/}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    const data = await response.json();
    return data;
}

async function obtenerDatosDesdeAPI(id) {
    const url = `${API_ENDPOINT}/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function obtenerIdDelPokemon() {
    const pokemonId = document.querySelector('.pokemon-id').textContent.slice(1);
    return parseInt(pokemonId);
}

function mostrarPokemon(data) {
    const div = document.createElement("div");
    div.classList.add("pokemon");

    const imagenUrl = data.sprites.other['official-artwork'].front_default || 'https://i.pinimg.com/originals/f8/33/5a/f8335abfc56c2a665ca700c0c24a68a5.png';

    div.innerHTML = `
        <p class="pokemon-id-back">#${data.id}</p>
        <div class="pokemon-imagen">
            <img src="${imagenUrl}" alt="" width="96" height="96">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${data.id}</p>
                <h2 class="pokemon-nombre">${data.name}</h2>
            </div> 
            <div class="pokemon-tipos">
                ${data.types.map(type => `<p class="tipo ${type.type.name}">${type.type.name.toUpperCase()}</p>`).join('')}
            </div>
        </div> 
    `;
    listaPokemon.append(div);
    div.addEventListener("click", async () => {

        const tipos = data.types.map(type => `<p class="tipo ${type.type.name}">${type.type.name.toUpperCase()}</p>`).join('');

        let img = data.sprites.other["official-artwork"].front_default;
        let defaultImg = "https://i.pinimg.com/originals/f8/33/5a/f8335abfc56c2a665ca700c0c24a68a5.png";

        const stats = data.stats.map(stat => `
            <div class="stat-bar-container">
                <input type="range" class="stat-slider" id="stat-slider-${stat.stat.name}" value="${stat.base_stat}" min="0" max="255">
                <span class="stat_poke">
                    <b class="base_stat" contenteditable="true" id="stat_${stat.stat.name}">${stat.base_stat}</b> <b class="name_stat">${stat.stat.name}</b>
                </span>
            </div>
        `).join('');

        Swal.fire({
            html: `
                <div class="contenedor-swal"> 
                    <div class="cont-imagen-Swal">
                        <img class="imagen-Swal" 
                            src="${img ? img : defaultImg}" 
                            alt="${data.name}">
                    </div>
                    <p class="pokemon-id">#${data.id}</p> 
                    <p class="nombre-alert">${data.name.toUpperCase()}</p>
                    <div class="tipos-alert" style="text-align: center;">
                        ${tipos}
                    </div>
                    <div class="pokeStats">
                        ${stats}
                    </div>  
                    <button class="btn-guardar-cambios"  data-namepok="${data.name}">Guardar</button>
                </div>`,
            width: "auto",
            background: "white",
            padding: "5rem",
            
            showConfirmButton: false,
        });
    });
}

function guardarCambios() {
    const jsonCambios = JSON.stringify(cambiosStats);
    console.log(jsonCambios);

    const pokemonId = obtenerIdDelPokemon();
    guardarCambiosEnAPI(pokemonId, cambiosStats);
}

document.getElementById('formCantidad').addEventListener('submit', async (e) => {
    e.preventDefault();
    const cantidad = document.getElementById('cantidad').value;
    if (cantidad && !isNaN(cantidad) && cantidad > 0) {
        mostrarDatos(Number(cantidad));
    }
});

document.querySelectorAll('.btn-header').forEach(btn => {
    btn.addEventListener('click', async () => {
        const tipo = btn.id;

        const listaPokemones = document.getElementById('listaPokemon');
        listaPokemones.innerHTML = '';

        mostrarDatos(null, tipo);
    });
});

document.addEventListener('input', async (e) => {
    if (e.target.classList.contains('stat-slider')) {
        const statSlider = e.target;
        // const statValue = parseInt(statSlider.value);
        // const statName = statSlider.id.split('-')[2];
        // const baseStatElement = statSlider.parentElement.querySelector('.base_stat');
        // baseStatElement.textContent = statValue;
        // cambiosStats[statName] = statValue;

        // const pokemonId = obtenerIdDelPokemon();
        // guardarCambiosEnAPI(pokemonId, cambiosStats);
    }
});

document.addEventListener("click", async(e)=> {
    if(e.target.classList.contains("btn-guardar-cambios")) {
        let inputs = document.querySelectorAll(".stat-slider");
        inputs.forEach(input => {
            console.log(input.value);
        });
        let datos = {
            name: e.target.dataset.namepok,
            stats: inputs
            
        };
        console.log(datos);
    }
})