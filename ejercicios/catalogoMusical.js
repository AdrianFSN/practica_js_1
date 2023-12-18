/*Ejercicio 5: Catálogo Musical
Imagina que estás creando un sistema de gestión para un catálogo musical.
Cada canción tiene las siguientes propiedades:
Nombre de la Canción
Género
Duración (en minutos)
Implementa un programa que permita realizar las siguientes operaciones:
Agregar Canción: Permite al usuario ingresar información sobre una nueva canción y
agrégala al catálogo.
Listar Canciones: Muestra en la consola la información detallada de todas las canciones
en el catálogo. Si el catálogo está vacío, imprime un mensaje indicando que no hay
canciones.
Buscar Canciones por Género: Pide al usuario que ingrese un género y muestra en la
consola todas las canciones de ese género.
Calcular Promedio de Duración: Calcula y muestra en la consola el promedio de la
duración de todas las canciones en el catálogo. (opcional)*/


const crearCancion = () => {
    let cancion = {
        titulo: prompt('Por favor, introduce el título de la canción'),
        genero: prompt('Por favor, introduce el género de la canción'),
        duracion: parseFloat(prompt('Por favor, introduce la duración de la canción (en número y en minutos.segundos)'), 10)
    };
    return cancion;
};
//console.log(crearCancion())

const crearCatalogo = () => {
    let listaCanciones = [];
    let exit = false
    while (!exit) {
        listaCanciones.push(crearCancion());
        let continuar = prompt('¿Quieres añadir más canciones? (S, N)').toUpperCase();
        if (continuar === 'S') {
            console.log('Seguimos');
        } else if (continuar === 'N') {
            console.log('Paramos de agregar canciones');
            exit = true;
        } else { console.log('Solo puedes contestar S o N') };
    };
    return listaCanciones;
};
console.log(crearCatalogo());


/*const crearCatalogo = () => {
    let listaCanciones = [];
    const agregarCancion = (titulo, genero, duracion) => {
        {
            titulo,
                genero,
                duracion
        }
        listaCanciones.push(agregarCancion);
    }
    return listaCanciones;
    //const listarCanciones = función
    //const buscarXGenero = función
    //const calcularPromedioDuración = función
*/