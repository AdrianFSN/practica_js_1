//Settings
const NUM_JUGADORES_NECESARIOS = 4;

// Métodos
const apuntarJugadores = (numParticipantes = NUM_JUGADORES_NECESARIOS) => {
    let listaJugadores = [];
    while (listaJugadores.length < numParticipantes) {
        let nombreJugador = prompt('Introduce un nombre para el jugador: ');
        listaJugadores.push(nombreJugador);
    }
    if (listaJugadores.length === numParticipantes) {
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

const createMatch = (jugadorA, jugadorB) => {
    let rivalA = {
        nombre: jugadorA,
        evolucionPuntos: [],
        totalPuntos: 0

    };
    let rivalB = {
        nombre: jugadorB,
        evolucionPuntos: [],
        totalPuntos: 0
    };

    return [rivalA, rivalB];
};

// Torneo
const jugadoresInscritos = apuntarJugadores(); // deben ser 4
console.log(`Has inscrito a 4 jugadores: 
${jugadoresInscritos.join('\n')}
Puedes iniciar el torneo.`);

const cuadroTorneo = crearEmparejamientos(jugadoresInscritos);

const game = createMatch('Alberto C', 'David J');
console.log(game);



