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
const PADDING_TITULO = 35;
const PADDING_GENERO = 20;

const objetoCatalogo = {
    listaCanciones: [
        {
            titulo: 'Qué puedo hacer',
            genero: 'Pop',
            duracion: 3.05,
            mostrarMinutoSegundo: calcularMinutos = (duracion) => {
                let minutos = duracion / 60;
                minutos = minutos.toString().split('.');
                let minutoLimpio = minutos[0];
                console.log(minutoLimpio);

                let segundos = duracion % 60;
                console.log(segundos);

                return `${minutoLimpio} min ${segundos} s`
            }
        },
        {
            titulo: 'Toxicity',
            genero: 'Metal',
            duracion: 3.38
        },
        {
            titulo: 'Aunque es de noche',
            genero: 'Flamenco',
            duracion: 3.05
        },
        {
            titulo: 'Lo que dicta el corazón',
            genero: 'Pop',
            duracion: 3.42
        },
        {
            titulo: 'Country girl',
            genero: 'Rock',
            duracion: 4.31
        }

    ],
    headers: ['TÍTULO'.padEnd(PADDING_TITULO), 'GÉNERO'.padEnd(PADDING_GENERO), 'DURACIÓN'].join(' '),
    sacarListaCanciones: listarCatalogo = () => {
        let tablaCatalogo = [objetoCatalogo.headers];
        objetoCatalogo.listaCanciones
            .forEach(item => tablaCatalogo.push([item.titulo.padEnd(PADDING_TITULO), item.genero.padEnd(PADDING_GENERO), item.duracion].join(' ')));
        return tablaCatalogo.join('\n');

    },
    crearCatalogo: llenarCatalogo = () => {
        let cancionesAñadidas = [];
        const crearCancion = () => {
            let cancion = {
                titulo: prompt('Por favor, introduce el título de la canción'),
                genero: prompt('Por favor, introduce el género de la canción'),
                duracion: parseInt(prompt('Por favor, introduce la duración de la canción en segundos'))
            };
            console.log(cancion.duracion, typeof cancion.duracion)
            /*             const calcularMinutos = (duracion) => {
                            let minutos = duracion / 60;
                            minutos = minutos.toString().split('.');
                            let minutoLimpio = minutos[0];
                            console.log(minutoLimpio);
            
                            let segundos = duracion % 60;
                            console.log(segundos);
            
                            return`${minutoLimpio} min ${segundos} s`
                        };
                        calcularMinutos(cancion.duracion); */

            while (cancion.duracion < 0 || isNaN(cancion.duracion)) {
                cancion.duracion = parseInt(prompt('Por favor, introduce la duración de la canción en segundos'));
                //calcularMinutos(cancion.duracion);
            };
            return cancion;


        };

        let exit = false
        while (!exit) {
            let continuar = prompt('¿Quieres añadir una canción al catálogo? (S, N)')
            if (continuar !== null) {
                continuar = continuar.toUpperCase()
                if (continuar === 'S') {
                    cancionesAñadidas.push(crearCancion());
                } else if (continuar === 'N') {
                    alert('Paramos de agregar canciones');
                    exit = true;
                } else { console.log('Solo puedes contestar S o N') };
            } else {
                alert('Operación cancelada');
                exit = true
            };

        };
        cancionesAñadidas = objetoCatalogo.listaCanciones.concat(cancionesAñadidas);
        const formatCancionesAñadidas = cancionesAñadidas
            .map(item => [
                item.titulo.padEnd(PADDING_TITULO),
                item.genero.padEnd(PADDING_GENERO),
                item.duracion
            ]);
        console.log(objetoCatalogo.headers)
        formatCancionesAñadidas.forEach(item =>
            console.log(item.join(' '))
        );

    },
    filtrarXGenero: filtradoGenero = () => {
        let elegirGenero = prompt('Introduce el género musical por el que quieres filtrar');
        if (elegirGenero !== null) {
            elegirGenero = elegirGenero.toLowerCase();
            const listaFiltrada = objetoCatalogo.listaCanciones
                .filter(elemento => elemento.genero.toLowerCase() === elegirGenero);

            console.log(objetoCatalogo.headers);
            listaFiltrada.forEach(item => {
                console.log(item.titulo.padEnd(PADDING_TITULO),
                    item.genero.padEnd(PADDING_GENERO),
                    item.duracion)
            });

            if (listaFiltrada.length === 0) {
                alert('No hay resultados para tu búsqueda');
            };
        } else {
            alert('Operación cancelada');
        };
    },
    calcularMedia: calculoDuracionMedia = () => {
        const duracionCatalogo = objetoCatalogo.listaCanciones
            .reduce((acum, item) =>
                (acum += item.duracion), 0);
        return {
            duracionTotal: duracionCatalogo,
            duraccionMedia: duracionCatalogo / objetoCatalogo.listaCanciones.length
        };
    },
};

const miCatalogo = objetoCatalogo;

let userChoice = prompt(`
¿Qué deseas hacer en el catálogo?
Elige una opción:

- Listar todas las canciones (L)
- Filtrar canciones por género (G)
- Añadir nuevas canciones (A)
- Calcular la duración media de las canciones (M)

`);

if (userChoice !== null) {
    userChoice = userChoice.toUpperCase();
    if (userChoice === 'L') {
        console.log(miCatalogo.sacarListaCanciones());
    } else if (userChoice === 'A') {
        miCatalogo.crearCatalogo();
    } else if (userChoice === 'G') {
        miCatalogo.filtrarXGenero();
    } else if (userChoice === 'M') {
        console.log(miCatalogo.calcularMedia());
    } else {
        console.log('Ninguna opción válida elegida')
    }
} else {
    console.log('Has cancelado la acción');
};
