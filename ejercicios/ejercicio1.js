/** Enunciado Ejercicio 1
Crea un archivo ejercicio1.js que tenga un objeto usuario con los siguientes campos:
- Nombre (el tuyo o inventado)
- Apellidos (el tuyo o inventado)
- Una lista con los temas del bootcamp Node.js, Git y react con sus nombres y fechas
de inicio de cada módulo. Fecha en formato “YYYY-MM-DD”
- Si estás en busqueda activa con un valor de verdadero o false
En este archivo queremos mostrar por pantalla la fecha de inicio del módulo de react del
objeto que hemos creado anteriormente. */

// Creo objeto usuario:
const usuario = {
    nombre: 'Antonio',
    apellido1: 'Pérez',
    apellido2: 'Sánchez',
    busquedaEmpleo: true,
    asignaturas: [
        {
            titulo: 'Git',
            fechaInicio: '2023-11-28'
        },
        {
            titulo: 'Desarrollo Backend con Node.js',
            fechaInicio: '2024-02-12'
        },
        {
            titulo: 'Fundamentos REACT',
            fechaInicio: '2024-04-15'
        }
    ]
};

// Creo una variable para definir la asignatura que se quiere buscar. No uso prompt para evitar errores.
let asignaturaBuscada = 'Fundamentos REACT';

// Solución con bucle directamente:
console.log('Solución con bucle for... in:');

const buscaAsignatura = usuario.asignaturas;
let exito = false;

for (let asig in buscaAsignatura) {
    if (buscaAsignatura[asig].titulo.includes(asignaturaBuscada)) {
        console.log(`La fecha de inicio de ${asignaturaBuscada} es ${buscaAsignatura[asig].fechaInicio}.`)
        exito = true;
    }
}
if (!exito) {
    console.log(`La asignatura ${asignaturaBuscada} no está registrada.`)
}
// Solución con función:
console.log('-------------------------------');
console.log('Solución con función:');

const buscaAsignaturaEnObjeto = (usuarioAsignaturas, materia) => {
    let datosDelObjeto = usuarioAsignaturas;
    let moduloClase = materia;
    for (let dato in datosDelObjeto) {
        if (datosDelObjeto[dato].titulo.includes(moduloClase)) {
            return console.log(`La fecha de inicio de ${moduloClase} es ${datosDelObjeto[dato].fechaInicio}.`)
        }
    }
    console.log(`La asignatura ${moduloClase} no está registrada.`)
};

let mostrarEnPantalla = buscaAsignaturaEnObjeto(usuario.asignaturas, asignaturaBuscada);

/*Aquí puedo ver la ficha completa del usuario creado, aunque no es lo que pide el ejercicio.
let fichaUsuario = `
Nombre: ${usuario.nombre}
Apellidos: ${usuario.apellido1} ${usuario.apellido2}
Asignaturas en curso:
\t${usuario.asignaturas[0][0]}
\t${usuario.asignaturas[1][0]}
\t${usuario.asignaturas[2][0]}
¿En búsqueda de empleo?: ${usuario.busquedaEmpleo ? 'Sí' : 'No'}
Fecha de inicio del módulo REACT: ${usuario.asignaturas[2][1]}
`;

console.log('Ficha completa del objeto usuario:');
console.log(fichaUsuario);
console.log('Respuesta concreta al ejercicio 1:');
console.log(usuario.asignaturas[2][1]);*/