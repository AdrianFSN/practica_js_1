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
    let skill = habilidad;
    const filtrado = datos
        .filter((item) => (item.habilidades.includes(skill)))
        .map(elemento => elemento.nombre);

    console.log(`
Del equipo de desarrolladores del cliente,
esta es la lista de personas con la habilidad "${skill}":
${filtrado}.
    `);
};

filtroHabilidades(habilidadDemandada);

console.log('-------------------------------');

// Solución ejercicio transformaciones lista 2:
console.log('Solución ejercicio transformaciones lista 2:')

const nombresProyectos = [];

for (let j = 0; j < datos.length; j++) {
    for (let h = 0; h < datos[j].proyectos.length; h++) {
        nombresProyectos.push(datos[j].proyectos[h].nombre)
    };
}
console.log(nombresProyectos);