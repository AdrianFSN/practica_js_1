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

    const traducirPuntos = (tanteoA) => {
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
        } else {
            console.log('PUNTUACIÓN SUPERADA');
        }
    };
    const pointWonBy = (id) => {
        let punto = 1;
        if (id === rivalA.id) {
            console.log(`¡Punto para ${rivalA.nombre}!`)
            rivalA.totalPuntos += punto;
            rivalA.evolucionPuntos = traducirPuntos(rivalA.totalPuntos);
        } else {
            console.log(`¡Punto para ${rivalB.nombre}!`)
            rivalB.totalPuntos += punto;
            rivalB.evolucionPuntos = traducirPuntos(rivalB.totalPuntos);
        };
        marcadorRonda = [
            rivalA.evolucionPuntos,
            rivalB.evolucionPuntos
        ];
    };

    const jugarRonda = () => {
        console.log(`Empieza el punto entre ${rivalA.nombre} y ${rivalB.nombre}...`);
        console.log(`Está siendo un peloteo vibrante...`);
        pointWonBy(Math.floor(Math.random() * 2) + 1);
        if (rivalA.totalPuntos > 3) {
            rivalA.rondasGanadas += 1;
        } else if (rivalB.totalPuntos > 3) {
            rivalB.rondasGanadas += 1;

        }
    }
    const partido = () => {
        console.log(`¡Comienza el partido entre ${rivalA.nombre} y ${rivalB.nombre}!`);
        let salir = false;

        while (!salir) {
            if (rivalA.rondasGanadas < 1 && rivalB.rondasGanadas < 1) {
                jugarRonda();
                console.log(`Así va el marcador de esta ronda:
${rivalA.nombre}: ${rivalA.evolucionPuntos}
${rivalB.nombre}: ${rivalB.evolucionPuntos}`);
            } else {
                console.log('Alguien ha ganado');
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



