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
        console.log('Has inscrito a 4 jugadores. Puedes iniciar el torneo');
        return listaJugadores;
    }
};

const formarParejas = (pareja, lista) => {
    let pointerPareja = 0;
    while (pointerPareja < 2) {
        let index = Math.floor(Math.random() * NUM_JUGADORES_NECESARIOS);
        if (!pareja.includes(lista[index])) {
            pareja.push(lista[index]);
            pointerPareja += 1;
        }
    }
}
const crearEmparejamientos = (lista) => {
    let listaParejas = [];
    let parejasNecesarias = NUM_JUGADORES_NECESARIOS / 2;

    let unaPareja = [];

    formarParejas(unaPareja, lista);
    listaParejas.push(unaPareja)
    console.log(listaParejas);
};

// Objeto torneo
const torneo = {
    jugadoresInscritos: apuntarJugadores(), // deben ser 4
    emparejamientos: [], //debe ser una lista de listas de 2 elementos
    partidoEnJuego: {
        rival1: '',
        rival2: '',
        marcadorRival1: 0,
        marcadorRival2: 0,
    }
};

const miTorneo = torneo;
//console.log(miTorneo.jugadoresInscritos);
crearEmparejamientos(miTorneo.jugadoresInscritos);


