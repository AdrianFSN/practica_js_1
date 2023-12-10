const usuario = {
    nombre: 'Adrián',
    apellido1: 'Pérez',
    apellido2: 'Sánchez',
    busquedaEmpleo: true,
    asignaturas: [
        ['Git', '2023-11-28'],
        ['Desarrollo Backend con Node.js', '2024-02-12'],
        ['Fundamentos REACT', '2024-04-15'],
    ]
};

let fichaUsuario = `
Nombre: ${usuario.nombre}
Apellidos: ${usuario.apellido1} ${usuario.apellido2}
Asignaturas en curso:
\t${usuario.asignaturas[0][0]}
\t${usuario.asignaturas[1][0]}
\t${usuario.asignaturas[2][0]}
¿En búsqueda de empleo?: ${usuario.busquedaEmpleo ? 'Sí' : 'No'}
Fecha de inicio del módulo REACT: ${usuario.asignaturas[2][1]}
`
console.log('Ficha completa del objeto usuario:');
console.log(fichaUsuario);
console.log('Respuesta concreta al ejercicio 1:');
console.log(usuario.asignaturas[2][1]);