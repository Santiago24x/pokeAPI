import { mostrarDatos, mostrarPokemon, menuTipoPokemon } from "./app.js";

document.addEventListener('DOMContentLoaded', () => {

    // Iniciar la aplicación mostrando automáticamente los primeros 50 Pokémon
    const formCantidad = document.getElementById('formCantidad');
    const inputCantidad = document.getElementById('cantidad');

    formCantidad.addEventListener('submit', async (e) => {
        e.preventDefault();

        let cantidadPokemones = inputCantidad.value;

        if (!isNaN(cantidadPokemones) && cantidadPokemones > 0) {
            mostrarDatos(Number(cantidadPokemones));
        }
    });

    mostrarDatos(30);
    menuTipoPokemon();
    mostrarPokemon();
});