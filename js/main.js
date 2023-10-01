const API_ENDPOINT = 'https://pokeapi.co/api/v2'; // API de pokemones
const MOCK_API_ENDPOINT = 'https://650b8803dfd73d1fab0a0b24.mockapi.io/pokemon_data';
const listaPokemon = document.querySelector("#listaPokemon"); // Lista de pokemones en el DOM


//Funcion para obtener los pokemones dependiendo si es por tipo o cantidad
async function obtenerUrls(cantidad, tipo = null) {
    let URL;
    if (tipo) {
        URL = `${API_ENDPOINT}/type/${tipo}`;
    } else {
        URL = `${API_ENDPOINT}/pokemon/?limit=${cantidad}`;
    }

    // Obtener el json de los pokemones
    const respuesta = await fetch(URL);
    const datos = await respuesta.json();
    console.log(datos);

    // Obtener los urls de los pokemones
    if (tipo) {
        return datos.pokemon.map(pokemon => pokemon.pokemon.url);
    } else {
        return datos.results.map(pokemon => pokemon.url); 
    }
}
    

async function mostrarDatos(cantidad, tipo = null) {
    const listaPokemones = document.getElementById('listaPokemon');
    listaPokemones.innerHTML = '';

    const urls = await obtenerUrls(cantidad, tipo);
    console.log(urls);
    const obtenerDatos = async (url) => {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        console.log(datos);
        mostrarPokemon(datos);
    };
    
    urls.forEach(obtenerDatos);
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

    //!Preguntarle al viejo green el como sabe que div se esta clickando
    div.addEventListener("click", async () => {
        const tipos = data.types.map(type => `<p class="tipo ${type.type.name}">${type.type.name.toUpperCase()}</p>`).join('');
        let img = data.sprites.other["official-artwork"].front_default;
        let defaultImg = "https://i.pinimg.com/originals/f8/33/5a/f8335abfc56c2a665ca700c0c24a68a5.png";
        
        const stats = data.stats.map(stat => `
            <div class="stat-bar-container">
                <input type="range" class="stat-slider" id="stat-slider-${stat.stat.name}" value="${stat.base_stat}" min="0" max="255">
                <span class="stat_poke">
                    <b class="base_stat" contenteditable="true" id="stat_${stat.stat.name}">${stat.base_stat}</b> 
                    <b class="name_stat">${stat.stat.name}</b>
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
                    <button id="guardar" class="btn-guardar">Guardar</button>
                </div>`,
            width: "auto",
            background: "white",
            padding: "5rem",
            showConfirmButton: false,
        });
    });
}


const cambiosStats = {};
document.addEventListener('input', async (e) => {
    if (e.target.classList.contains('stat-slider')) {
        const statSlider = e.target;
        const statValue = parseInt(statSlider.value);
        const statName = statSlider.id.split('-')[2];
        cambiosStats[statName] = statValue;

        // Actualiza el valor de la estadística en el HTML
        const statElement = document.getElementById(`stat_${statName}`);
        statElement.textContent = statValue;
    }
});


const formCantidad = document.getElementById('formCantidad');
const inputCantidad = document.getElementById('cantidad');

formCantidad.addEventListener('submit', async (e) => {
    e.preventDefault();

    let cantidad = inputCantidad.value;

    if (!cantidad) {
        cantidad = 50;
    }
    if (!isNaN(cantidad) && cantidad > 0) {
        mostrarDatos(Number(cantidad));
    }
});
inputCantidad.addEventListener('input', () => {
    if (!inputCantidad.value) {
        location.reload();
    }
});
// Iniciar la aplicación mostrando automáticamente los primeros 50 Pokémon
mostrarDatos(50);


document.querySelectorAll('.btn-header').forEach(btn => {
    btn.addEventListener('click', async () => {
        const tipo = btn.id;

        const listaPokemones = document.getElementById('listaPokemon');
        listaPokemones.innerHTML = '';

        mostrarDatos(null, tipo);
    });
});



