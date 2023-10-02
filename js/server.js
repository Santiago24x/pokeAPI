const MOCK_API_ENDPOINT = 'http://127.0.0.1:5010/pokemon_data';


async function obtenerDatosMockAPI() {
    const response = await fetch(MOCK_API_ENDPOINT);
    const data = await response.json();
    return data;
}


async function validarPokemons(id) {
    const datosMockAPI = await obtenerDatosMockAPI();
    const pokemonEnMockAPI = datosMockAPI.find(pokemon => pokemon.id_pokemon === id);

    return pokemonEnMockAPI;
}


//Ya se envia y se actualiza el pokemon :)
async function guardarOActualizarMockApi(id_pokemon, stats) {
    let datos = await obtenerDatosMockAPI();
    let pokemon = datos.find(p => p.id_pokemon === id_pokemon);

    if (pokemon) {
        // Actualizar el pokemon existente
        const response = await fetch(`${MOCK_API_ENDPOINT}/${pokemon.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...pokemon, ...stats })
        });

        const data = await response.json();
        return data;
    } else {
        // Crear un nuevo registro
        stats['id_pokemon'] = id_pokemon;
        const response = await fetch(MOCK_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(stats)
        });
        const data = await response.json();
        return data;
    }
}




export { guardarOActualizarMockApi as mockApiPokemons, obtenerDatosMockAPI, validarPokemons }