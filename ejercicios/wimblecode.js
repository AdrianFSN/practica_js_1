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

/* const crearPartidos = (nombre1, nombre2) => {
    const rivalA = Object.assign({}, jugador);
    const rivalB = Object.assign({}, jugador);

    rivalA.nombre = nombre1;
    rivalB.nombre = nombre2;

} */

// Objeto jugador
const jugador = {
    id: 0,
    nombre: '',
    evolucionPuntos: '0',
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

    asignarRivalIndex: (listIndex1, listIndex2) => {
        torneo.jugador1Index = listIndex1;
        torneo.jugador2Index = listIndex2;
    },

    pointWonBy: (id = Math.floor(Math.random() * 2) + 1) => {
        let punto = 1;

        torneo.parejaJugando
            .forEach(item => {
                if (item.id === id) {
                    console.log(`¡Punto para ${item.nombre}!`);
                    item.totalPuntos += punto;
                    item.evolucionPuntos = (torneo.traducirPuntos(item.totalPuntos));
                    torneo.comprobarDeuce(torneo.parejaJugando)
                };
            });
    },

    comprobarDeuce: (lista) => {
        const controlador = lista
            .map(item => item.totalPuntos)

        let puntuacionA = controlador[0];
        let puntuacionB = controlador[1];

        if ((puntuacionA === 3 && puntuacionB === 3)
            || (puntuacionA === 4 && puntuacionB === 4)) {
            return torneo.rondaIsDeuce = true;
        } else {
            return false;
        };
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
    },

    getCurrentRoundScore: () => {
        let resultado = `Marcador ronda:
${torneo.parejaJugando[0].nombre} ${torneo.parejaJugando[0].evolucionPuntos} - ${String(torneo.parejaJugando[1].evolucionPuntos)} ${torneo.parejaJugando[1].nombre}`;

        if (torneo.rondaIsDeuce) {
            resultado = 'Deuce'
        }
        return console.log(resultado)
    },

    getRoundScore: () => {
        let marcador = [
            [' ', 'Rondas J1', 'Rondas J2', 'Rondas J3', 'Juegos']
        ]

        torneo.parejaJugando.forEach(item => {
            let listaConJugador = [
                item.nombre,
                item.resultadoJuego1,
                item.resultadoJuego2,
                item.resultadoJuego3,
                item.juegosGanados
            ];
            marcador.push(listaConJugador)
        })
        let formatear = marcador
            .map((elemento) => elemento
                .map((item) => String(item)
                    .padStart(10)).join(' '));


        console.log(`
Marcador partido: ---------------------------------------------->
${formatear.join('\n')}`);
    },

    reasignarValor: (jugador, parametro, valor = 0) => {
        jugador[parametro] = valor;
    },

    playRound: (player1, player2) => {
        console.log(`Empieza una nueva RONDA entre ${player1} y ${player2}...`);
        console.log(`Está siendo un peloteo vibrante...`);
        game.pointWonBy();
        game.getCurrentRoundScore();

        torneo.parejaJugando.forEach(player => {

            if (torneo.comprobarDeuce(torneo.parejaJugando)) {
                if (torneo.parejaJugando[0].totalPuntos !== 5 && torneo.parejaJugando[1].totalPuntos !== 5) {
                    if (torneo.parejaJugando[0].totalPuntos === 4 && torneo.parejaJugando[1].totalPuntos === 4) {
                        player.totalPuntos--;
                    };

                } else if (player.totalPuntos === 5) {
                    console.log(`¡Ronda ganada por ${player.nombre}!`);
                    player.rondasGanadas++;
                    for (let i = 0; i < torneo.parejaJugando.length; i++) {
                        const jugadorActual = torneo.parejaJugando[i];

                        if (jugadorActual.evolucionPuntos === 'RONDA GANADA') {
                            const otroJugador = torneo.parejaJugando[(i + 1) % 2];

                            if (jugadorActual.juegosGanados < 1 && otroJugador.juegosGanados < 1) {
                                torneo.reasignarValor(jugadorActual, 'resultadoJuego1', jugadorActual.rondasGanadas);
                            } else if ((jugadorActual.juegosGanados === 1 && otroJugador.juegosGanados === 0)
                                || (jugadorActual.juegosGanados === 0 && otroJugador.juegosGanados === 1)) {
                                torneo.reasignarValor(jugadorActual, 'resultadoJuego2', jugadorActual.rondasGanadas);
                            } else if (jugadorActual.juegosGanados === 1 && otroJugador.juegosGanados === 1) {
                                torneo.reasignarValor(jugadorActual, 'resultadoJuego3', otroJugador.rondasGanadas);
                            }

                            torneo.getRoundScore();
                        }
                    }

                    torneo.parejaJugando.forEach(item => {
                        torneo.reasignarValor(item, 'totalPuntos');
                        torneo.reasignarValor(item, 'evolucionPuntos', '0');
                        //torneo.rondaIsDeuce = false
                    })
                };

            } else {
                if (player.totalPuntos === 4) {
                    console.log(`¡Ronda ganada por ${player.nombre}!`);
                    player.rondasGanadas++;


                    for (let i = 0; i < torneo.parejaJugando.length; i++) {
                        const jugadorActual = torneo.parejaJugando[i];

                        if (jugadorActual.evolucionPuntos === 'RONDA GANADA') {
                            const otroJugador = torneo.parejaJugando[(i + 1) % 2];

                            if (jugadorActual.juegosGanados < 1 && otroJugador.juegosGanados < 1) {
                                torneo.reasignarValor(jugadorActual, 'resultadoJuego1', jugadorActual.rondasGanadas);
                            } else if ((jugadorActual.juegosGanados === 1 && otroJugador.juegosGanados === 0)
                                || (jugadorActual.juegosGanados === 0 && otroJugador.juegosGanados === 1)) {
                                torneo.reasignarValor(jugadorActual, 'resultadoJuego2', jugadorActual.rondasGanadas);
                            } else if (jugadorActual.juegosGanados === 1 && otroJugador.juegosGanados === 1) {
                                torneo.reasignarValor(jugadorActual, 'resultadoJuego3', otroJugador.rondasGanadas);
                            }

                            torneo.getRoundScore();
                        }
                    }

                    torneo.parejaJugando.forEach(item => {
                        torneo.reasignarValor(item, 'totalPuntos');
                        torneo.reasignarValor(item, 'evolucionPuntos', '0');
                    })


                };
            };

        });
    },

    playJuego: (player1, player2) => {
        console.log(`¡Comienza un nuevo JUEGO entre ${player1} y ${player2}!`);

        let rondasNecesarias = 4;
        let salir = false;
        while (!salir) {
            let comprobarRondas = torneo.parejaJugando
                .filter(element => element.rondasGanadas < rondasNecesarias);
            //console.log(comprobarRondas)
            if (comprobarRondas.length === 2) {
                torneo.playRound(torneo.parejaJugando[0].nombre, torneo.parejaJugando[1].nombre);
                torneo.rondaIsDeuce = false
            } else {
                torneo.parejaJugando.forEach(item => {
                    if (item.rondasGanadas === rondasNecesarias) {
                        console.log(`¡${item.nombre} ha ganado el JUEGO!`)
                        item.juegosGanados++;
                        torneo.getRoundScore();
                        rondasNecesarias = 4;
                        torneo.reasignarValor(item, 'rondasGanadas')
                        console.log(comprobarRondas.length);
                        salir = true
                    };
                });
            };
            if ((torneo.parejaJugando[0].rondasGanadas < 7 && torneo.parejaJugando[0].rondasGanadas >= rondasNecesarias && torneo.parejaJugando[0].rondasGanadas - torneo.parejaJugando[1].rondasGanadas === 1) ||
                (torneo.parejaJugando[1].rondasGanadas < 7 && torneo.parejaJugando[1].rondasGanadas >= rondasNecesarias && torneo.parejaJugando[1].rondasGanadas - torneo.parejaJugando[0].rondasGanadas === 1)) {
                rondasNecesarias++;
            };
        }




    }

};

const game = torneo;

console.log(game);

game.createMatch('Alberto C', 'David J');
//game.asignarRivalIndex(torneo.parejaJugando[0], torneo.parejaJugando[1])

//game.getRoundScore();
console.log(game.rondaIsDeuce);
game.playJuego(torneo.parejaJugando[0].nombre, torneo.parejaJugando[1].nombre);



