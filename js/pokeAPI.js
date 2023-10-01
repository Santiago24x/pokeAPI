import { validarPokemons, obtenerDatosMockAPI } from "./mockAPI.js";

const API_ENDPOINT = 'https://pokeapi.co/api/v2'; // API de pokemones


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
    validarPokemons(obtenerDatosMockAPI(), datos);

    // Obtener los urls de los pokemones
    if (tipo) {
        return datos.pokemon.map(pokemon => pokemon.pokemon.url);
    } else {
        return datos.results.map(pokemon => pokemon.url);
    }
}

export {
    obtenerUrls
}
