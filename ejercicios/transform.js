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

const desarrolladoresJavascript = [];

for (let i = 0; i < datos.length; i++) {
    if (datos[i].habilidades.includes('JavaScript')) {
        desarrolladoresJavascript.push(datos[i]);
    }
}
console.log(desarrolladoresJavascript);

// Solución ejercicio transformaciones lista 2:

const nombresProyectos = [];

for (let j = 0; j < datos.length; j++) {
    for (let h = 0; h < datos[j].proyectos.length; h++) {
        nombresProyectos.push(datos[j].proyectos[h].nombre)
    };
}
console.log(nombresProyectos);