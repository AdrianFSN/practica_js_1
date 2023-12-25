//Settings
const NUM_JUGADORES_NECESARIOS = 4;

// Métodos
const apuntarJugadores = () => {
    let listaJugadores = [];
    while (listaJugadores.length < NUM_JUGADORES_NECESARIOS) {
        let nombreJugador = prompt('Introduce un nombre para el jugador: ');
        listaJugadores.push(nombreJugador);
    }
    if (listaJugadores.length === NUM_JUGADORES_NECESARIOS) {
        console.log(`Has inscrito a 4 jugadores: 
${listaJugadores.join('\n')}
Puedes iniciar el torneo.`);
        return listaJugadores;
    }
};

const formarParejas = (pareja, lista) => {
    let pointerPareja = 0;
    while (pointerPareja < 2) {
        let index = Math.floor(Math.random() * NUM_JUGADORES_NECESARIOS);
        if (!pareja.includes(lista[index]) && index < lista.length) {
            pareja.push(lista[index]);
            pointerPareja += 1;
        }
    }
    return pareja;
};

const limpiarListaJugadores = (pareja, lista) => {
    return lista.filter(jugador => !pareja.includes(jugador));
};

const crearEmparejamientos = (lista) => {
    let copiaLista = lista.slice();
    let listaParejas = [];
    let parejasNecesarias = (NUM_JUGADORES_NECESARIOS / 2);
    let unaPareja = [];

    for (let i = 0; i < parejasNecesarias; i++) {
        listaParejas.push(formarParejas(unaPareja, copiaLista));
        copiaLista = limpiarListaJugadores(unaPareja, copiaLista);
        unaPareja = [];
    }
    return listaParejas;
};

// Objeto torneo
const torneo = {
    jugadoresInscritos: apuntarJugadores(), // deben ser 4
    partidoEnJuego: {
        rival1: '',
        rival2: '',
        marcadorRival1: 0,
        marcadorRival2: 0,
    },
};

const miTorneo = torneo;

//miTorneo.jugadoresInscritos;
console.log(`
Este es el cuadro del torneo:
${crearEmparejamientos(miTorneo.jugadoresInscritos).join('\n')}`);



