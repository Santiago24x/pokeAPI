const MOCK_API_ENDPOINT = 'https://650b8803dfd73d1fab0a0b24.mockapi.io/pokemon_data';


async function obtenerDatosMockAPI() {
    const response = await fetch(MOCK_API_ENDPOINT);
    const data = await response.json();
    return data;
}
//crear una funcion mas que lo que hace es validar loss datos de pokeapi y cambiarlos por lo que estan
//modificados en mockapi
function validarPokemons(datosMockAPI, datosPokeAPI) {
    //si el id de un pokemon de pokeapi eta en mockapi
    //reemplazar lo datos de mockapi


    //return nuevosDatos;
    //motrarPokemon(nuevoDatos);
}

//ya se valida que no se repita
async function guardarMockApi(id, stats) {
    let datos = await obtenerDatosMockAPI();
    let idExistentes = datos.some(d => d.id_pokemon === id);

    if (idExistentes) {
        console.log("deje la recocha pirobo");

    } else {
        stats['id_pokemon'] = id;
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

export { guardarMockApi as mockApiPokemons, obtenerDatosMockAPI, validarPokemons }