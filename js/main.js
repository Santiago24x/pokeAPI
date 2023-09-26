const listaPokemon = document.querySelector("#listaPokemon");

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
    listaPokemones.innerHTML = '';

    const urls = await obtenerUrls(cantidad, tipo);

    const obtenerDatos = async (url) => {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
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

    // Agregar evento de clic al div
    div.addEventListener('click', () => {
        const habilidades = data.abilities.map(ability => ability.ability.name).join(', ');

        Swal.fire({
            title: 'Habilidades',
            text: habilidades,
            icon: 'info',
            confirmButtonText: 'Entendido'
        });
    });

    listaPokemon.append(div);
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
