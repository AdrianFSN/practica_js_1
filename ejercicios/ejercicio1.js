/** Enunciado Ejercicio 1
Crea un archivo ejercicio1.js que tenga un objeto usuario con los siguientes campos:
- Nombre (el tuyo o inventado)
- Apellidos (el tuyo o inventado)
- Una lista con los temas del bootcamp Node.js, Git y react con sus nombres y fechas
de inicio de cada módulo. Fecha en formato “YYYY-MM-DD”
- Si estás en busqueda activa con un valor de verdadero o false
En este archivo queremos mostrar por pantalla la fecha de inicio del módulo de react del
objeto que hemos creado anteriormente. */

//-----------------------------------------------
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

//-----------------------------------------------
// Creo una variable para pedir la asignatura que se quiere buscar.

let asignaturaBuscada = prompt(`
Por favor, indica la asignatura de la que quieres saber la fecha de inicio de su módulo:
(Escribe su nombre tal y como aparece en la lista)
    - Git
    - Desarrollo Backend con Node.js
    - Fundamentos REACT
`);

let cancelarConsulta = false;

if (asignaturaBuscada === null) {
    cancelarConsulta = true;
    if (cancelarConsulta) {
        console.log(`ATENCIÓN: Has decidido cancelar la consulta.
Recarga la página si cambias de idea.`);
        console.log('-------------------------------');
    };

};

if (!cancelarConsulta) {
    //-----------------------------------------------
    // Solución 1: con bucle directamente:

    console.log('Solución 1: con bucle for... in:');

    const buscaAsignatura = usuario.asignaturas;
    let exito = false;

    if (asignaturaBuscada.trim() !== '') {
        for (let asig in buscaAsignatura) {
            if (buscaAsignatura[asig].titulo.includes(asignaturaBuscada)) {
                console.log(`La fecha de inicio del módulo de "${asignaturaBuscada}" es ${buscaAsignatura[asig].fechaInicio}.`)
                exito = true;
            };
        }
        if (!exito) {
            console.log(`La asignatura "${asignaturaBuscada}" no está registrada.
Revisa que la has escrito correctamente.`)
        };
    } else {
        console.log('No has introducido ninguna asignatura.');
    };

    //-----------------------------------------------
    // Solución 2: hecha con función flecha y bucle for... in:

    console.log('-------------------------------');
    console.log('Solución 2: con función flecha y bucle for... in:');

    const buscaAsignaturaEnObjeto = (usuarioAsignaturas, materia) => {
        let datosDelObjeto = usuarioAsignaturas;
        let moduloClase = materia;

        if (moduloClase.trim() !== '') {
            for (let dato in datosDelObjeto) {
                if (datosDelObjeto[dato].titulo.includes(moduloClase)) {
                    return console.log(`La fecha de inicio del módulo de "${moduloClase}" es ${datosDelObjeto[dato].fechaInicio}.`);
                };
            }
            console.log(`La asignatura "${moduloClase}" no está registrada.
Revisa que la has escrito correctamente.`);
        } else {
            console.log('No has introducido ninguna asignatura.');
        };


    };

    buscaAsignaturaEnObjeto(usuario.asignaturas, asignaturaBuscada);

    //-----------------------------------------------
    // Solución 3: hecha con función flecha, filter y map:
    console.log('-------------------------------');
    console.log('Solución 3: con función, filter y map:');

    const buscaAsignaturaEnObjetoBis = (usuarioAsignaturas, materia) => {
        let datosDelObjeto = usuarioAsignaturas;
        let moduloClase = materia;

        const materiaBuscada = datosDelObjeto
            .filter(elemento => elemento.titulo === moduloClase)
            .map(date => date.fechaInicio);

        if (materiaBuscada.length > 0) {
            console.log(`La fecha de inicio del módulo de "${moduloClase}" es ${Object.values(materiaBuscada)}.`);
        } else if (moduloClase.trim() === '') {
            console.log('No has introducido ninguna asignatura.');
        }
        else {
            console.log(`La asignatura "${moduloClase}" no está registrada.
Revisa que la has escrito correctamente.`);
        };

    };

    buscaAsignaturaEnObjetoBis(usuario.asignaturas, asignaturaBuscada);
};