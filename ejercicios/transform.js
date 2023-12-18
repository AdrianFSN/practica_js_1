/**Nuestro cliente tiene un array de datos y nos ha pedido que saquemos la siguiente
información. El listado de los desarrolladores que tengan como habilidad “JavaScript” y el
listado de los proyectos en el que sus desarrolladores trabajan.
Estos son los datos: */

const datos = [
    {
        id: 1,
        nombre: 'Juan',
        habilidades: ['JavaScript', 'HTML', 'CSS'],
        proyectos: [
            { id: 1, nombre: 'Proyecto 1' },
            { id: 2, nombre: 'Proyecto 2' }
        ]
    },
    {
        id: 2,
        nombre: 'María',
        habilidades: ['Python', 'SQL', 'Django'],
        proyectos: [
            { id: 3, nombre: 'Proyecto 3' },
            { id: 4, nombre: 'Proyecto 4' }
        ]
    },
    {
        id: 3,
        nombre: 'Pedro',
        habilidades: ['Java', 'Spring', 'Hibernate'],
        proyectos: [
            { id: 5, nombre: 'Proyecto 5' },
            { id: 6, nombre: 'Proyecto 6' }
        ]
    }
];

//Solución ejercicio transformaciones lista 1:
console.log('Solución ejercicio transformaciones lista 1:');

let habilidadDemandada = 'JavaScript';

const filtroHabilidades = (habilidad) => {
    const filtrado = datos
        .filter((item) => (item.habilidades.includes(habilidad)))
        .map(elemento => elemento.nombre);

    console.log(`
Del equipo de desarrolladores del cliente,
esta es la lista de personas con la habilidad "${habilidad}":
${filtrado.join(', ')}.
    `);
};

filtroHabilidades(habilidadDemandada);

console.log('-------------------------------');

// Solución ejercicio transformaciones lista 2:
console.log('Solución ejercicio transformaciones lista 2:')

const filtroDesarrolladoresActivos = (lista) => {

    const filtroProyectos = (desarrollador) => {
        const filtradoProyectosXDesarrollador = datos
            .filter(item => item.nombre === desarrollador)
            .reduce((acum, objetoProyecto) => acum.concat(objetoProyecto.proyectos), [])
            .map(nombreProyecto => nombreProyecto.nombre);

        console.log(`
Los proyectos en los que trabaja ${desarrollador} son: ${filtradoProyectosXDesarrollador.join(', ')}.`);
    };

    lista.forEach(persona => filtroProyectos(persona.nombre));
};

filtroDesarrolladoresActivos(datos)
