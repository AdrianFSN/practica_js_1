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
const crearEmparejamientos = (lista) => {
    let listaParejas = [];
    let parejasNecesarias = NUM_JUGADORES_NECESARIOS / 2;
    let controladorNumJugadores = NUM_JUGADORES_NECESARIOS - 1;
    let unaPareja = [];

    let pointer = 0;
    while (pointer < 2) {
        let index = Math.floor(Math.random() * controladorNumJugadores);
        unaPareja.push(lista[index]);
        pointer += 1;
    }
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