import { obtenerUrls } from "./pokeAPI.js";
import { mockApiPokemons, validarPokemons } from "./mockAPI.js";

const listaPokemon = document.querySelector("#listaPokemon"); // Lista de pokemones en el DOM

async function obtenerDatosPokemons(cantidad, tipo = null) {
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

    listaPokemon.append(div);

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
                    <button id="${data.id}" class="btn-guardar">Guardar</button>
                </div>`,
            width: "auto",
            background: "white",
            padding: "5rem",
            showConfirmButton: false,
        });

        const cambiosStats = {};
        document.addEventListener('input', async (e) => {
            if (e.target.classList.contains('stat-slider')) {
                const statSlider = e.target;
                const statValue = parseInt(statSlider.value);
                const statNameParts = statSlider.id.split('-');
                let statName;

                if (statNameParts.length === 4) {
                    statName = `${statNameParts[2]}-${statNameParts[3]}`;
                } else {
                    statName = statNameParts[2];
                }
                cambiosStats[statName] = statValue;

                const statElement = document.getElementById(`stat_${statName}`);
                statElement.textContent = statValue;
                
            }
        });

        let boton = document.getElementById(data.id);
        boton.addEventListener('click', async () => {
            mockApiPokemons(data.id, cambiosStats);
            Swal.fire({
                icon: 'success',
                title: 'Cambios guardados',
                showConfirmButton: false,
                timer: 1500
            });
        });

        const pokemonEnMockAPI = await validarPokemons(data.id);

        if (pokemonEnMockAPI) {
            const cambiosStats = {
                "hp": pokemonEnMockAPI.hp,
                "attack": pokemonEnMockAPI.attack,
                "defense": pokemonEnMockAPI.defense,
                "special-attack": pokemonEnMockAPI["special-attack"],
                "special-defense": pokemonEnMockAPI["special-defense"],
                "speed": pokemonEnMockAPI.speed
            };

            for (const statName in cambiosStats) {
                const statValue = cambiosStats[statName];
                const statElement = document.getElementById(`stat_${statName}`);
                const statSlider = document.getElementById(`stat-slider-${statName}`)
                statElement.textContent = statValue;
                statSlider.value = statValue;
                for (let i = 0; i <= statValue; i++) {
                    setTimeout(() => {
                        statSlider.value = i;
                    }, i * 10); // Ajusta la velocidad de animación aquí (en milisegundos)
                }  
            }
        }
    });
}
let menuTipoPokemon = () => {
    //cargar botones de menu
    let nav = `
            <nav class="nav">
                <img src="./img/logo.png" alt="Logo Pokédex">
     
                <ul class="nav-list">
                    <li class="nav-item"><button class="btn btn-header normal"
                            id="normal">Normal</button></li>
                    <li class="nav-item"><button class="btn btn-header fire"
                            id="fire">Fire</button></li>
                    <li class="nav-item"><button class="btn btn-header water"
                            id="water">Water</button></li>
                    <li class="nav-item"><button class="btn btn-header grass"
                            id="grass">Grass</button></li>
                    <li class="nav-item"><button class="btn btn-header electric"
                            id="electric">Electric</button></li>
                    <li class="nav-item"><button class="btn btn-header ice"
                            id="ice">Ice</button></li>
                    <li class="nav-item"><button class="btn btn-header fighting"
                            id="fighting">Fighting</button></li>
                    <li class="nav-item"><button class="btn btn-header poison"
                            id="poison">Poison</button></li>
                    <li class="nav-item"><button class="btn btn-header ground"
                            id="ground">Ground</button></li>
                    <li class="nav-item"><button class="btn btn-header flying"
                            id="flying">Flying</button></li>
                    <li class="nav-item"><button class="btn btn-header psychic"
                            id="psychic">Psychic</button></li>
                    <li class="nav-item"><button class="btn btn-header bug"
                            id="bug">Bug</button></li>
                    <li class="nav-item"><button class="btn btn-header rock"
                            id="rock">Rock</button></li>
                    <li class="nav-item"><button class="btn btn-header ghost"
                            id="ghost">Ghost</button></li>
                    <li class="nav-item"><button class="btn btn-header dark"
                            id="dark">Dark</button></li>
                    <li class="nav-item"><button class="btn btn-header dragon"
                            id="dragon">Dragon</button></li>
                    <li class="nav-item"><button class="btn btn-header steel"
                            id="steel">Steel</button></li>
                    <li class="nav-item"><button class="btn btn-header fairy"
                            id="fairy">Fairy</button></li>
                </ul>
            </nav>`;
    let elementoPadre = document.querySelector("header");
    elementoPadre.insertAdjacentHTML("afterbegin", nav);

    //agregar evento a botones de menu

    document.querySelectorAll('.btn-header').forEach(btn => {
        btn.addEventListener('click', async () => {
            const tipo = btn.id;

            const listaPokemones = document.getElementById('listaPokemon');
            listaPokemones.innerHTML = '';

            obtenerDatosPokemons(null, tipo);
        });
    });
}


export {
    obtenerDatosPokemons as mostrarDatos,
    mostrarPokemon,
    menuTipoPokemon
}