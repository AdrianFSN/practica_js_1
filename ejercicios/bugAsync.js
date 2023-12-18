/*Tenemos otro error que nuestro cliente nos pide arreglar. El cliente está pidiendo un usuario
y nos dice que está usando el id correcto el 1. Pero que siempre le da undefined. Nos ha
pasado el código que tenemos que revisar y arreglar. Para este problema crear un archivo
llamado bugAsync.js con la solución.
// Este programa simula una llamada asincrónica para obtener un usuario
function obtenerUsuario(id) {
let usuario;
setTimeout(() => {
if (id === 1) {
usuario = { id: 1, nombre: 'John Doe' };
}
}, 2000);
return usuario;
}
const usuario = obtenerUsuario(1);
console.log(usuario);*/

// Este programa simula una llamada asincrónica para obtener un usuario

console.log('Dos soluciones: con "promesa / then" y con "async / await".');
console.log('-------------------------------');

function obtenerUsuario(id) {
    return new Promise((resolve, reject) => {
        let usuario;
        setTimeout(() => {
            if (id === 1) {
                usuario = { id: 1, nombre: 'John Doe' };
                resolve(usuario);
            } else { reject(new Error('Usuario no encontrado')) }
        }, 2000);
    });
}
console.log('Cargando soluciones...');

//Solución con promesa / then
const usuario = obtenerUsuario(1)
    .then(usuario => {
        console.log('Este es el usuario buscado con "promesa / then"; ', usuario);
    })
    .catch(error => {
        console.error('Error "promesa / then": ', error.message);
    });

// Solución con async / await
console.log('-------------------------------');

const main = async () => {
    try {
        let user = await obtenerUsuario(1);
        console.log('Este es el usuario buscado con "async / await" :', user)
    } catch (error) { console.error('Error "async / array": ', error.message) }
};
main()