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
        evolucionPuntos: [],
        totalPuntos: 0,
        rondasGanadas: 0,
        juegosGanados: 0,
        partidosGanados: 0

    };
    let rivalB = {
        id: 2,
        nombre: jugadorB,
        evolucionPuntos: 0,
        totalPuntos: 0,
        rondasGanadas: 0,
        juegosGanados: 0,
        partidosGanados: 0
    };
    let marcadorRonda = [
        rivalA.evolucionPuntos,
        rivalB.evolucionPuntos
    ];

    const traducirPuntosNormal = (tanteoA) => {
        if (tanteoA === 0) {
            return '0';
        } else if (tanteoA === 1) {
            return 15;
        } else if (tanteoA === 2) {
            return 30;
        } else if (tanteoA === 3) {
            return 40;
        } else if (tanteoA === 4) {
            return 'RONDA GANADA';
        };
    };

    const traducirPuntosDeuce = (tanteoA) => {
        if (tanteoA === 0) {
            return '0';
        } else if (tanteoA === 1) {
            return 15;
        } else if (tanteoA === 2) {
            return 30;
        } else if (tanteoA === 3) {
            return 'Deuce';
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
        marcadorRonda = [
            rivalA.evolucionPuntos,
            rivalB.evolucionPuntos
        ];
    };

    const reseteos = (jugador, parametro, valor = 0) => {
        jugador[parametro] = valor;
    };

    const jugarRonda = () => {
        console.log(`Empieza el punto entre ${rivalA.nombre} y ${rivalB.nombre}...`);
        console.log(`Está siendo un peloteo vibrante...`);
        pointWonBy(Math.floor(Math.random() * 2) + 1);
        rivalA.evolucionPuntos = traducirPuntosNormal(rivalA.totalPuntos);
        rivalB.evolucionPuntos = traducirPuntosNormal(rivalB.totalPuntos);

        if (rivalA.totalPuntos === 3 && rivalB.totalPuntos === 3) {
            console.log('¡Hay deuce!')
            rivalA.evolucionPuntos = traducirPuntosDeuce(rivalA.totalPuntos);
            rivalB.evolucionPuntos = traducirPuntosDeuce(rivalB.totalPuntos);
            console.log(`Así va el marcador de esta ronda:
${rivalA.nombre}: ${rivalA.evolucionPuntos}
${rivalB.nombre}: ${rivalB.evolucionPuntos}`);

            while (rivalA.totalPuntos !== 5 && rivalB.totalPuntos !== 5) {
                pointWonBy(Math.floor(Math.random() * 2) + 1);
                rivalA.evolucionPuntos = traducirPuntosDeuce(rivalA.totalPuntos);
                rivalB.evolucionPuntos = traducirPuntosDeuce(rivalB.totalPuntos);

                if (rivalA.evolucionPuntos === 'Ventaja' || rivalA.evolucionPuntos === 'RONDA GANADA') {
                    rivalB.evolucionPuntos = 40
                } else if (rivalB.evolucionPuntos === 'Ventaja' || rivalB.evolucionPuntos === 'RONDA GANADA') {
                    rivalA.evolucionPuntos = 40
                };

                console.log(`Vamos a actualizar el marcador de esta ronda:
${rivalA.nombre}: ${rivalA.evolucionPuntos}
${rivalB.nombre}: ${rivalB.evolucionPuntos}`);

                if (rivalA.totalPuntos === 4 && rivalB.totalPuntos === 4) {
                    console.log('¡Hay deuce de nuevo!')
                    rivalA.totalPuntos -= 1;
                    rivalB.totalPuntos -= 1;
                    rivalA.evolucionPuntos = traducirPuntosDeuce(rivalA.totalPuntos);
                    rivalB.evolucionPuntos = traducirPuntosDeuce(rivalB.totalPuntos);

                    if (rivalA.evolucionPuntos === 'Ventaja' || rivalA.evolucionPuntos === 'RONDA GANADA') {
                        rivalB.evolucionPuntos = 40
                    } else if (rivalB.evolucionPuntos === 'Ventaja' || rivalB.evolucionPuntos === 'RONDA GANADA') {
                        rivalA.evolucionPuntos = 40
                    };

                    console.log(`El marcador de esta ronda va así:
${rivalA.nombre}: ${rivalA.evolucionPuntos}
${rivalB.nombre}: ${rivalB.evolucionPuntos}`);
                };
            }
            if (rivalA.totalPuntos === 5) {
                rivalA.rondasGanadas += 1;
                console.log(`¡${rivalA.nombre} gana la ronda!`)
                reseteos(rivalA, 'totalPuntos')
                reseteos(rivalB, 'totalPuntos')
            } else if (rivalB.totalPuntos === 5) {
                rivalB.rondasGanadas += 1;
                console.log(`¡${rivalB.nombre} gana la ronda!`)
                reseteos(rivalA, 'totalPuntos')
                reseteos(rivalB, 'totalPuntos')
            }

        } else {
            if (rivalA.totalPuntos === 4) {
                rivalA.rondasGanadas += 1;
                console.log(`¡${rivalA.nombre} gana la ronda!`)
                reseteos(rivalA, 'totalPuntos')
                reseteos(rivalB, 'totalPuntos')
            } else if (rivalB.totalPuntos === 4) {
                rivalB.rondasGanadas += 1;
                console.log(`¡${rivalB.nombre} gana la ronda!`)
                reseteos(rivalA, 'totalPuntos')
                reseteos(rivalB, 'totalPuntos')

            };
        }
    };

    const partido = () => {
        console.log(`¡Comienza el partido entre ${rivalA.nombre} y ${rivalB.nombre}!`);

        let rondasNecesarias = 4;
        let salir = false;
        while (!salir) {
            if (rivalA.rondasGanadas < rondasNecesarias && rivalB.rondasGanadas < rondasNecesarias) {
                jugarRonda();
                console.log(`Así está el marcador de la ronda:
${rivalA.nombre}: ${rivalA.evolucionPuntos}
${rivalB.nombre}: ${rivalB.evolucionPuntos}`);
                if ((rivalA.rondasGanadas < 7 && rivalA.rondasGanadas >= rondasNecesarias && rivalA.rondasGanadas - rivalB.rondasGanadas === 1) ||
                    (rivalB.rondasGanadas < 7 && rivalB.rondasGanadas >= rondasNecesarias && rivalB.rondasGanadas - rivalA.rondasGanadas === 1)) {
                    rondasNecesarias += 1;
                    jugarRonda();
                    console.log('rondas necesarias es ', rondasNecesarias)
                }
            } else {
                console.log('EL PARTIDO LO HA GANADO...');
                console.log(rivalA.totalPuntos)
                console.log(rivalB.totalPuntos)
                console.log(rivalA.rondasGanadas)
                console.log(rivalB.rondasGanadas)
                salir = true;
            }
        }
    }
    partido();


    return [rivalA, rivalB, marcadorRonda];
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

const game = createMatch(cuadroTorneo[0][0], cuadroTorneo[0][1]);
//const game = createMatch('Alberto C', 'David J');
//console.log('Vamos con el primer partido', game);

