const NUM_JUGADORES_NECESARIOS = 4;
let listaJugadoresDisponibles = ['Alberto C', 'David J', 'Javier M', 'Edu Aguilar'];

// Métodos
const crearEmparejamientos = (lista) => {
    let copiaLista = lista.slice();
    let listaParejas = [];
    let parejasNecesarias = (NUM_JUGADORES_NECESARIOS / 2);
    let unaPareja = [];
    const limpiarListaJugadores = (pareja, unaLista) => {
        return unaLista.filter(jugador => !pareja.includes(jugador));
    };

    for (let i = 0; i < parejasNecesarias; i++) {
        listaParejas.push(formarParejas(unaPareja, copiaLista));
        copiaLista = limpiarListaJugadores(unaPareja, copiaLista);
        unaPareja = [];
    }
    return listaParejas;
};

const crearPartidos = (nombre1, nombre2) => {
    const rivalA = Object.assign({}, jugador);
    const rivalB = Object.assign({}, jugador);

    rivalA.nombre = nombre1;
    rivalB.nombre = nombre2;

}

// Objeto jugador
const jugador = {
    id: 0,
    nombre: '',
    evolucionPuntos: '',
    totalPuntos: 0,
    rondasGanadas: 0,
    juegosGanados: 0,
    resultadoJuego1: 0,
    resultadoJuego2: 0,
    resultadoJuego3: 0
};


// Objeto torneo
const torneo = {
    listaJugadoresInscritos: listaJugadoresDisponibles,
    parejaJugando: undefined,
    rondaIsDeuce: false,
    createMatch: (nombre1, nombre2) => {
        const rivalA = Object.assign({}, jugador);
        const rivalB = Object.assign({}, jugador);

        rivalA.nombre = nombre1;
        rivalA.id = 1;
        rivalB.nombre = nombre2;
        rivalB.id = 2;
        torneo.parejaJugando = [rivalA, rivalB];
        return torneo.parejaJugando;

    },

    pointWonBy: (id) => {
        let punto = 1;

        torneo.parejaJugando
            .forEach(item => {
                if (item.id === id) {
                    item.totalPuntos += punto;
                };
            });
    },

    traducirPuntos: (tanteo) => {
        if (tanteo === 0) {
            return '0';
        } else if (tanteo === 1) {
            return '15';
        } else if (tanteo === 2) {
            return '30';
        } else if (tanteo === 3) {
            return '40';
        } else if (tanteo === 4) {
            if (torneo.rondaIsDeuce) {
                return 'Ventaja'
            } else {
                return 'RONDA GANADA'
            };
        };
    }

};

const game = torneo;

console.log(game);

game.createMatch('Alberto C', 'David J');
console.log(torneo.parejaJugando);

game.pointWonBy(1);
game.pointWonBy(2);

game.parejaJugando.forEach((elemento) => {
    console.log(game.traducirPuntos(elemento.totalPuntos))
}
);