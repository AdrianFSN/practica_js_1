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
        totalPuntos: 0

    };
    let rivalB = {
        id: 2,
        nombre: jugadorB,
        evolucionPuntos: [],
        totalPuntos: 0
    };
    let marcadorRonda = [
        rivalA.totalPuntos,
        rivalB.totalPuntos
    ];
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
            rivalA.totalPuntos,
            rivalB.totalPuntos
        ];
    };
    //let numeroAleatrorio = Math.floor(Math.random() * 2) + 1;
    //console.log(numeroAleatrorio);
    //console.log(pointWonBy(numeroAleatrorio));
    //console.log(pointWonBy(Math.floor(Math.random() * 2) + 1));
    pointWonBy(Math.floor(Math.random() * 2) + 1);

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
console.log('Esto es game: ', game[0], game[1], game[2]);



