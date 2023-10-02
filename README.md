# Aplicación Web de Pokémon

Esta es una aplicación web que te permite explorar y gestionar datos de Pokémon. Puedes ver detalles de diferentes Pokémon, incluyendo sus nombres, tipos y estadísticas base. Además, puedes guardar y actualizar las estadísticas de Pokémon específicos utilizando una API simulada llamada **MockAPI**.

## Características

### 1. Ver Detalles de Pokémon

Esta función te permite ver detalles de diferentes Pokémon, como sus nombres, tipos y estadísticas base. Al hacer clic en un Pokémon, se abrirá una ventana emergente con información adicional.

### 2. Filtrar por Tipo

Puedes filtrar los Pokémon por sus tipos, lo que te permite ver solo aquellos de un tipo específico. Esto facilita la búsqueda de Pokémon de tu interés.

### 3. Guardar y Actualizar Estadísticas

Tienes la capacidad de guardar y actualizar las estadísticas de un Pokémon. Las modificaciones se almacenan en una API simulada llamada **MockAPI**.

## Detalles Técnicos

### Frontend

- **HTML y CSS**: La estructura y diseño de la aplicación están desarrollados en HTML y CSS respectivamente. Se utilizan estilos personalizados y se hace uso de la fuente *Press Start 2P*.

- **JavaScript (ES6+)**: Se emplea JavaScript moderno para manipular el DOM y realizar peticiones a la API de Pokémon.

- **Librerías Externas**:
    - **SweetAlert2**: Se utiliza para crear ventanas emergentes interactivas, como la que muestra los detalles de un Pokémon y confirma la actualización de estadísticas.

    - **Fetch API**: Se utiliza para realizar peticiones a las APIs tanto de Pokémon (*PokeAPI*) como a la API simulada (*MockAPI*).

### Backend (MockAPI)

- **MockAPI**: La API simulada está construida con MockAPI. Los desarrolladores pueden crear su propio endpoint modificando la estructura de datos para adaptarla a sus necesidades.
- **PockeAPI**: La API de pockeapi nos brinda los pokemones junto con toda su informacion los cuales utilizamos para el diseño de esta web haciendo peticiones de tipo fetch.

### Uso

1. Abre la aplicación en tu navegador web.
2. Ingresa la cantidad de Pokémon que deseas visualizar y haz clic en "Obtener".
3. Explora los Pokémon mostrados en la página. Haz clic en un Pokémon para ver más detalles y realizar cambios en sus estadísticas.
4. También puedes filtrar los Pokémon por tipo utilizando los botones de navegación.


## Agradecimientos

- Los datos de Pokémon provienen de [PokeAPI](https://pokeapi.co/).
- Se utiliza una API simulada (*MockAPI*) para almacenar los datos de Pokémon con fines de demostración.

## Creado por 

[Santiago24x](https://github.com/Santiago24x)

---
## Contacto

Para cualquier consulta o sugerencia, no dudes en contactar a [Santiago Márquez ➲](santiagomarquez.it@gmail.com).
