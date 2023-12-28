//Settings
const NUM_JUGADORES_NECESARIOS = 4;

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

const createMatch = (jugadorA, jugadorB) => {
    let rivalA = {
        id: 1,
        nombre: jugadorA,
        evolucionPuntos: 0,
        totalPuntos: 0,
        rondasGanadas: 0,
        juegosGanados: 0,
        resultadoJuego1: 0,
        resultadoJuego2: 0,
        resultadoJuego3: 0

    };
    let rivalB = {
        id: 2,
        nombre: jugadorB,
        evolucionPuntos: 0,
        totalPuntos: 0,
        rondasGanadas: 0,
        juegosGanados: 0,
        resultadoJuego1: 0,
        resultadoJuego2: 0,
        resultadoJuego3: 0
    };

    const getRoundScore = () => {
        let marcador = [
            [' ', 'Rondas J1', 'Rondas J2', 'Rondas J3', 'Juegos'],
            [rivalA.nombre, rivalA.resultadoJuego1, rivalA.resultadoJuego2, rivalA.resultadoJuego3, rivalA.juegosGanados],
            [rivalB.nombre, rivalB.resultadoJuego1, rivalB.resultadoJuego2, rivalB.resultadoJuego3, rivalB.juegosGanados],
        ];

        let formatear = marcador
            .map((elemento) => elemento
                .map((item) => String(item)
                    .padStart(10)).join(' '));


        return console.log(`
Marcador partido: ---------------------------------------------->
${formatear.join('\n')}`);

    };
    const traducirPuntosNormal = (tanteoA) => {
        if (tanteoA === 0) {
            return '0';
        } else if (tanteoA === 1) {
            return '15';
        } else if (tanteoA === 2) {
            return '30';
        } else if (tanteoA === 3) {
            return '40';
        } else if (tanteoA === 4) {
            return 'RONDA GANADA';
        };
    };

    const traducirPuntosDeuce = (tanteoA) => {
        if (tanteoA === 0) {
            return '0';
        } else if (tanteoA === 1) {
            return '15';
        } else if (tanteoA === 2) {
            return '30';
        } else if (tanteoA === 3) {
            return '40';
        } else if (tanteoA === 4) {
            return 'Ventaja';
        } else if (tanteoA === 5) {
            return 'RONDA GANADA';
        };
    };

    const pointWonBy = (id) => {
        let punto = 1;
        if (id === rivalA.id) {
            console.log(`¡Punto para ${rivalA.nombre}!`)
            rivalA.totalPuntos += punto;

        } else {
            console.log(`¡Punto para ${rivalB.nombre}!`)
            rivalB.totalPuntos += punto;
        };
        marcador = [
            rivalA.evolucionPuntos,
            rivalB.evolucionPuntos
        ];
    };

    const reasignarValor = (jugador, parametro, valor = 0) => {
        jugador[parametro] = valor;
    };

    const jugarRonda = () => {
        console.log(`Empieza un nuevo punto entre ${rivalA.nombre} y ${rivalB.nombre}...`);
        console.log(`Está siendo un peloteo vibrante...`);
        pointWonBy(Math.floor(Math.random() * 2) + 1);
        rivalA.evolucionPuntos = traducirPuntosNormal(rivalA.totalPuntos);
        rivalB.evolucionPuntos = traducirPuntosNormal(rivalB.totalPuntos);

        if (rivalA.totalPuntos === 3 && rivalB.totalPuntos === 3) {
            rivalA.evolucionPuntos = traducirPuntosDeuce(rivalA.totalPuntos);
            rivalB.evolucionPuntos = traducirPuntosDeuce(rivalB.totalPuntos);
            getCurrentRoundScore();

            while (rivalA.totalPuntos !== 5 && rivalB.totalPuntos !== 5) {
                pointWonBy(Math.floor(Math.random() * 2) + 1);
                rivalA.evolucionPuntos = traducirPuntosDeuce(rivalA.totalPuntos);
                rivalB.evolucionPuntos = traducirPuntosDeuce(rivalB.totalPuntos);

                if (rivalA.evolucionPuntos === 'RONDA GANADA') {
                    rivalB.evolucionPuntos = '40'
                } else if (rivalB.evolucionPuntos === 'RONDA GANADA') {
                    rivalA.evolucionPuntos = '40'
                };

                getCurrentRoundScore();

                if (rivalA.totalPuntos === 4 && rivalB.totalPuntos === 4) {
                    rivalA.totalPuntos -= 1;
                    rivalB.totalPuntos -= 1;
                    rivalA.evolucionPuntos = traducirPuntosDeuce(rivalA.totalPuntos);
                    rivalB.evolucionPuntos = traducirPuntosDeuce(rivalB.totalPuntos);

                    if (rivalA.evolucionPuntos === 'RONDA GANADA') {
                        rivalB.evolucionPuntos = '40'
                    } else if (rivalB.evolucionPuntos === 'RONDA GANADA') {
                        rivalA.evolucionPuntos = '40'
                    };

                };
            }
            if (rivalA.totalPuntos === 5) {
                rivalA.rondasGanadas += 1;
                console.log(`¡${rivalA.nombre} gana la ronda!`);
                reasignarValor(rivalA, 'totalPuntos');
                reasignarValor(rivalB, 'totalPuntos');
            } else if (rivalB.totalPuntos === 5) {
                rivalB.rondasGanadas += 1;
                console.log(`¡${rivalB.nombre} gana la ronda!`);
                reasignarValor(rivalA, 'totalPuntos');
                reasignarValor(rivalB, 'totalPuntos');
            };

        } else {
            if (rivalA.totalPuntos === 4) {
                rivalA.rondasGanadas += 1;
                console.log(`¡${rivalA.nombre} gana la ronda!`);
                reasignarValor(rivalA, 'totalPuntos');
                reasignarValor(rivalB, 'totalPuntos');
            } else if (rivalB.totalPuntos === 4) {
                rivalB.rondasGanadas += 1;
                console.log(`¡${rivalB.nombre} gana la ronda!`);
                reasignarValor(rivalA, 'totalPuntos');
                reasignarValor(rivalB, 'totalPuntos');

            };
        };


    };

    const getCurrentRoundScore = () => {
        let resultado = `Marcador ronda:
${rivalA.nombre} ${rivalA.evolucionPuntos} - ${rivalB.evolucionPuntos} ${rivalB.nombre}`;
        if ((rivalA.totalPuntos === 3 && rivalB.totalPuntos === 3)
            || (rivalA.totalPuntos === 4 && rivalB.totalPuntos === 4)) {
            resultado = 'Deuce';
        };
        return console.log(resultado);
    };

    const partido = () => {
        console.log(`¡Comienza el partido entre ${rivalA.nombre} y ${rivalB.nombre}!`);

        let rondasNecesarias = 4;
        let juegosNecesarios = 2;
        let salir = false;
        while (!salir) {
            if (rivalA.juegosGanados < juegosNecesarios && rivalB.juegosGanados < juegosNecesarios) {
                if (rivalA.rondasGanadas < rondasNecesarias && rivalB.rondasGanadas < rondasNecesarias) {
                    jugarRonda();
                    getCurrentRoundScore();

                    if (rivalA.evolucionPuntos === 'RONDA GANADA') {
                        if (rivalA.juegosGanados < 1 && rivalB.juegosGanados < 1) {
                            reasignarValor(rivalA, 'resultadoJuego1', rivalA.rondasGanadas);
                        } else if ((rivalA.juegosGanados === 1 && rivalB.juegosGanados === 0)
                            || (rivalA.juegosGanados === 0 && rivalB.juegosGanados === 1)) {
                            reasignarValor(rivalA, 'resultadoJuego2', rivalA.rondasGanadas);
                        } else if (rivalA.juegosGanados === 1 && rivalB.juegosGanados === 1) {
                            reasignarValor(rivalA, 'resultadoJuego3', rivalA.rondasGanadas);
                        };

                        getRoundScore();

                    } else if (rivalB.evolucionPuntos === 'RONDA GANADA') {
                        if (rivalA.juegosGanados < 1 && rivalB.juegosGanados < 1) {
                            reasignarValor(rivalB, 'resultadoJuego1', rivalB.rondasGanadas);
                        } else if ((rivalA.juegosGanados === 1 && rivalB.juegosGanados === 0)
                            || (rivalA.juegosGanados === 0 && rivalB.juegosGanados === 1)) {
                            reasignarValor(rivalB, 'resultadoJuego2', rivalB.rondasGanadas);
                        } else if (rivalA.juegosGanados === 1 && rivalB.juegosGanados === 1) {
                            reasignarValor(rivalB, 'resultadoJuego3', rivalB.rondasGanadas);
                        }
                        getRoundScore();

                    };

                    if ((rivalA.rondasGanadas < 7 && rivalA.rondasGanadas >= rondasNecesarias && rivalA.rondasGanadas - rivalB.rondasGanadas === 1) ||
                        (rivalB.rondasGanadas < 7 && rivalB.rondasGanadas >= rondasNecesarias && rivalB.rondasGanadas - rivalA.rondasGanadas === 1)) {
                        rondasNecesarias += 1;
                        jugarRonda();
                    };
                } else {
                    console.log('EL JUEGO LO HA GANADO...');
                    if (rivalA.rondasGanadas > rivalB.rondasGanadas) {
                        console.log(`¡${rivalA.nombre}!`);
                        rivalA.juegosGanados++;
                    } else if (rivalB.rondasGanadas > rivalA.rondasGanadas) {
                        console.log(`¡${rivalB.nombre}!`);
                        rivalB.juegosGanados++;

                    };
                    // Presentar el marcador del juego
                    getRoundScore();
                    rondasNecesarias = 4;
                    reasignarValor(rivalA, 'rondasGanadas');
                    reasignarValor(rivalB, 'rondasGanadas');

                };
            } else {
                //Presentar ganador del partido
                console.log('EL PARTIDO LO HA GANADO...');
                if (rivalA.juegosGanados > rivalB.juegosGanados) {
                    console.log(`¡${rivalA.nombre}!`);
                    return rivalA.nombre;
                } else if (rivalB.juegosGanados > rivalA.juegosGanados) {
                    console.log(`¡${rivalB.nombre}!`)
                    return rivalB.nombre;
                };
                // Presentar el marcador del partido
                getRoundScore();
                salir = true;
            };
        }
    };

    let ganadorPartido = partido();

    return ganadorPartido;
};

// Torneo
const jugadoresInscritos = inscribirJugadores(); // deben ser 4
console.log(`Has inscrito a 4 jugadores: 
${jugadoresInscritos.join('\n')}
Puedes iniciar el torneo.`);

const cuadroTorneo = crearEmparejamientos(jugadoresInscritos);
console.log(`Este es el cuadro del torneo:
Partido 1: ${cuadroTorneo[0][0]} vs. ${cuadroTorneo[0][1]}
Partido 2: ${cuadroTorneo[1][0]} vs. ${cuadroTorneo[1][1]}`)

console.log('EMPIEZA LA PRIMERA SEMIFINAL ---------------------------------------------->')
const game1 = createMatch(cuadroTorneo[0][0], cuadroTorneo[0][1]);

console.log('EMPIEZA LA SEGUNDA SEMIFINAL ---------------------------------------------->')
const game2 = createMatch(cuadroTorneo[1][0], cuadroTorneo[1][1])

console.log(`
FINAL ---------------------------------------------->:
${game1} vs. ${game2} 
`);

const game3 = createMatch(game1, game2)

console.log(`
El torneo lo ha ganado...
¡${game3}!
`)

