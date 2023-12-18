/**Nuestro cliente tiene un array de datos y nos ha pedido que saquemos la siguiente
<<<<<<< HEAD
información.El listado de los desarrolladores que tengan como habilidad “JavaScript” y el
listado de los proyectos en el que sus desarrolladores trabajan.*/
=======
información. El listado de los desarrolladores que tengan como habilidad “JavaScript” y el
listado de los proyectos en el que sus desarrolladores trabajan.
Estos son los datos: */
>>>>>>> da306ce56a374494074c55bef8e8f97847c8dab5

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

// Solución ejercicio transformaciones lista 1:
console.log('-------------------------------');
console.log('Solución ejercicio transformaciones lista 1');

const desarrolladoresJavascript = datos
    .filter(elemento => elemento.habilidades.includes('JavaScript'));
console.log(desarrolladoresJavascript);

// Solución ejercicio transformaciones lista 2:
console.log('-------------------------------');
console.log('Solución ejercicio transformaciones lista 2');

const nombresProyectos = datos
    .map(elemento => elemento.proyectos
        .map(proyecto => proyecto.nombre))
    .reduce((acum, item) => acum.concat(item), []);
console.log(nombresProyectos);
