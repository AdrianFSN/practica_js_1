const NUM_JUGADORES_NECESARIOS = 4;
let listaJugadoresDisponibles = ['Alberto C', 'David J', 'Javier M', 'Edu Aguilar'];

// Métodos
const inscribirJugadores = (numParticipantes = NUM_JUGADORES_NECESARIOS) => {
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
    winner: '',
    loser: '',
    createMatch: (nombre1, nombre2) => {
        const rivalA = structuredClone(jugador);
        const rivalB = structuredClone(jugador);
        /* const rivalA = Object.assign({}, jugador);
        const rivalB = Object.assign({}, jugador); */

        rivalA.nombre = nombre1;
        rivalA.id = 1;
        rivalB.nombre = nombre2;
        rivalB.id = 2;
        torneo.parejaJugando = [rivalA, rivalB];
        return torneo.parejaJugando;

    },

    //= Math.floor(Math.random() * 2) + 1

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
            return torneo.rondaIsDeuce = false;
        };
    },

    flagTraducirDeuce: false,

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
            if (torneo.flagTraducirDeuce) {
                return 'Ventaja'
            } else {
                return 'RONDA GANADA'
            }
        } else if (tanteo === 5) {
            torneo.flagTraducirDeuce = false;
            return 'RONDA GANADA'
        }
    },

    getCurrentRoundScore: () => {
        let resultado = `Marcador ronda:
${torneo.parejaJugando[0].nombre} ${torneo.parejaJugando[0].evolucionPuntos} - ${torneo.parejaJugando[1].evolucionPuntos} ${torneo.parejaJugando[1].nombre}`;

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
                    .padStart(12)).join(' '));


        console.log(`
Marcador partido: ---------------------------------------------->
${formatear.join('\n')}`);
    },

    updateScoreboard: (rivalA, rivalB) => {
        // si ha ganado rivalA
        if (rivalA.juegosGanados < 1 && rivalB.juegosGanados < 1) {
            torneo.reasignarValor(rivalA, 'resultadoJuego1', rivalA.rondasGanadas);
        } else if ((rivalA.juegosGanados === 1 && rivalB.juegosGanados === 0)
            || (rivalA.juegosGanados === 0 && rivalB.juegosGanados === 1)) {
            torneo.reasignarValor(rivalA, 'resultadoJuego2', rivalA.rondasGanadas);
        } else if (rivalA.juegosGanados === 1 && rivalB.juegosGanados === 1) {
            torneo.reasignarValor(rivalA, 'resultadoJuego3', rivalA.rondasGanadas);
        }
    },

    reasignarValor: (jugador, parametro, valor = 0) => {
        jugador[parametro] = valor;
    },

    playRound: (listaJugando) => {

        const player1 = listaJugando[0];
        const player2 = listaJugando[1];
        let endRound = false;
        console.log(`Empieza una nueva RONDA entre ${player1.nombre} y ${player2.nombre}...`);
        torneo.getCurrentRoundScore();
        console.log(`Está siendo un peloteo vibrante...`);

        while (!endRound) {
            torneo.pointWonBy();
            torneo.getCurrentRoundScore();

            if (torneo.comprobarDeuce(listaJugando)) {
                while (player1.totalPuntos !== 5 && player2.totalPuntos !== 5) {
                    torneo.flagTraducirDeuce = true;

                    if (player1.totalPuntos === 4 && player2.totalPuntos === 4) {
                        player1.totalPuntos--;
                        player2.totalPuntos--;
                        torneo.reasignarValor(player1, 'evolucionPuntos', '40');
                        torneo.reasignarValor(player2, 'evolucionPuntos', '40');
                    };
                    torneo.pointWonBy();
                    torneo.getCurrentRoundScore()

                }

                torneo.parejaJugando.forEach(item => {
                    if (item.totalPuntos === 5) {
                        console.log(`<------------------ ¡Ronda ganada por ${item.nombre}! ------------------>`);
                        item.rondasGanadas++;

                        if (player1.totalPuntos === 5) {
                            torneo.updateScoreboard(player1, player2);
                        } else if (player2.totalPuntos === 5) {
                            torneo.updateScoreboard(player2, player1);
                        };

                        torneo.getRoundScore();

                        torneo.parejaJugando.forEach(jugador => {
                            torneo.reasignarValor(jugador, 'totalPuntos');
                            torneo.reasignarValor(jugador, 'evolucionPuntos', '0');
                        })
                        endRound = true;
                    };

                });
            }

            else {
                torneo.parejaJugando.forEach(item => {
                    if (item.totalPuntos === 4) {
                        console.log(`<------------------ ¡Ronda ganada por ${item.nombre}! ------------------>`);

                        item.rondasGanadas++;

                        if (player1.totalPuntos === 4) {
                            torneo.updateScoreboard(player1, player2);
                        } else if (player2.totalPuntos === 4) {
                            torneo.updateScoreboard(player2, player1);
                        };

                        torneo.getRoundScore();

                        torneo.parejaJugando.forEach(jugador => {
                            torneo.reasignarValor(jugador, 'totalPuntos');
                            torneo.reasignarValor(jugador, 'evolucionPuntos', '0');
                        })
                        endRound = true;
                    };

                });

            };
        };


    },

    playJuego: (listaJugando) => {
        const player1 = listaJugando[0];
        const player2 = listaJugando[1];

        console.log(`¡Comienza un nuevo JUEGO entre ${player1.nombre} y ${player2.nombre}!`);

        let rondasNecesarias = 4;
        let salir = false;
        while (!salir) {
            let comprobarRondas = listaJugando
                .filter(element => element.rondasGanadas < rondasNecesarias);

            if ((player1.rondasGanadas < 7 && player1.rondasGanadas >= rondasNecesarias && player1.rondasGanadas - player2.rondasGanadas < 2) ||
                (player2.rondasGanadas < 7 && player2.rondasGanadas >= rondasNecesarias && player2.rondasGanadas - player1.rondasGanadas < 2)) {
                rondasNecesarias++;
            };

            if (comprobarRondas.length === 2) {
                torneo.playRound(listaJugando);
            } else {
                listaJugando.forEach(item => {
                    if (item.rondasGanadas === rondasNecesarias) {
                        console.log(`#################### ¡${item.nombre.toUpperCase()} ha ganado el JUEGO! ####################`)
                        item.juegosGanados++;
                        torneo.getRoundScore();

                        torneo.reasignarValor(player1, 'rondasGanadas')
                        torneo.reasignarValor(player2, 'rondasGanadas')
                        salir = true;
                    };
                });
            };
        };
    },

    playMatch: (listaJugando) => {
        const player1 = listaJugando[0];
        const player2 = listaJugando[1];

        console.log(`¡Comienza un nuevo PARTIDO entre ${player1.nombre} y ${player2.nombre}!`);

        let juegosNecesarios = 2;
        let salir = false;

        while (!salir) {
            if (player1.juegosGanados < juegosNecesarios && player2.juegosGanados < juegosNecesarios) {
                torneo.playJuego(listaJugando);
            } else {
                listaJugando.forEach(item => {
                    if (item.juegosGanados === juegosNecesarios) {
                        console.log(`******************** ¡${item.nombre.toUpperCase()} ha ganado el PARTIDO! ********************`)

                        if (player1.juegosGanados === juegosNecesarios) {
                            torneo.updateScoreboard(player1, player2);
                        } else if (player2.juegosGanados === juegosNecesarios) {
                            torneo.updateScoreboard(player2, player1);
                        };

                        torneo.getRoundScore();
                        torneo.reasignarValor(item, 'juegosGanados')
                        winner = item.nombre;
                        salir = true;
                    } else if (item.juegosGanados !== juegosNecesarios) {
                        loser = item.nombre;
                    };

                });
            };
        }
    },

    getWinner: () => {
        return winner;
    },
    getLoser: () => {
        return loser;
    }
};

let exit = false;

// Desarrollo del torneo automático

while (!exit) {

    const jugadoresInscritos = inscribirJugadores(); // deben ser 4
    console.log(`Has inscrito a 4 jugadores: 
${jugadoresInscritos.join('\n')}
Puedes iniciar el torneo.`);

    const cuadroTorneo = crearEmparejamientos(jugadoresInscritos);

    let rivalA = cuadroTorneo[0][0];
    let rivalB = cuadroTorneo[0][1];
    let rivalC = cuadroTorneo[1][0];
    let rivalD = cuadroTorneo[1][1];

    console.log(`Este es el cuadro del torneo:
Partido 1: ${rivalA} vs. ${rivalB}
Partido 2: ${rivalC} vs. ${rivalD}`)

    const game1 = torneo;
    const game2 = torneo;
    const final = torneo;

    const clasificadosFinal = [];
    const descalificados = [];

    let marcadores = [];

    game1.createMatch(cuadroTorneo[0][0], cuadroTorneo[0][1]);
    game1.playMatch(game1.parejaJugando);
    console.log(`
    El ganador de la PRIMERA SEMIFINAL es -------------------------------->: 
    ${game1.getWinner()}
    `);
    clasificadosFinal.push(game1.getWinner());
    descalificados.push(game1.getLoser());

    game2.createMatch(cuadroTorneo[1][0], cuadroTorneo[1][1]);
    game2.playMatch(game2.parejaJugando);
    console.log(`
    El ganador de la SEGUNDA SEMIFINAL es -------------------------------->: 
    ${game2.getWinner()}
    `);
    clasificadosFinal.push(game2.getWinner());
    descalificados.push(game2.getLoser());



    final.createMatch(clasificadosFinal[0], clasificadosFinal[1]);
    final.playMatch(final.parejaJugando);
    clasificadosFinal.push(final.getWinner());
    descalificados.push(final.getLoser());
    console.log(`
    --------------------------- Semifinal 1 ---------------------------
    
    ${clasificadosFinal[0].toUpperCase()} ha ganado a ${descalificados[0]}

    --------------------------- Semifinal 2 ---------------------------
    
    ${clasificadosFinal[1].toUpperCase()} ha ganado a ${descalificados[1]}

    --------------------------- Final ---------------------------
    
    ${clasificadosFinal[2].toUpperCase()} ha ganado a ${descalificados[2]}

    **********########## El ganador del TORNEO es ##########**********: 

    ${final.getWinner().toUpperCase()}

    (Sube el cursor al inicio para ver el desarrollo de todos los partidos)
    `);


    exit = true;

};

