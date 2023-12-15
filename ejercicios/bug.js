/*Ejercicio 2 Arreglar bug
Nuestro cliente está intenando calcular el promedio de una lista de números pero nos dice
que no funciona. No nos da el error, solo este código que es el que tiene en producción.
Para este ejercicio tenemos que crear un archivo llamado bug.js con la solución.
const calcularPromedio = (numeros) => {
let sumaTotal = 0;
for (let i = 0; i <= numeros.length; i++) {
sumaTotal += numeros[i];
}
const promedio = sumaTotal / numeros.length;
return promedio;
};
const listaNumeros = [1, 2, 3, 4, 5];
const promedioNumeros = calcularPromedio(listaNumeros);*/

const calcularPromedio = (numeros) => {
    let sumaTotal = 0;
    for (let i = 0; i < numeros.length; i++) {
        sumaTotal += numeros[i];
    }
    const promedio = sumaTotal / numeros.length;
    return promedio;
};
const listaNumeros = [1, 2, 3, 4, 5];
const promedioNumeros = calcularPromedio(listaNumeros);
console.log(`
El problema se encontraba en la línea 18: "for (let i = 0; i <= numeros.length; i++)".
Al hacer la comparación con "i <= numeros.lenght", el valor de i supera el rango del array y devuelve NaN.
Lo correcto es dejar i como "i < numeros.length".
Así, la solución de calCularpromedio(listaNumeros) es ${promedioNumeros}.
`);