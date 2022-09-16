export interface Tablero {
    tablero: TableroClass;
    tiempo:  number;
    ronda:   Ronda;
}

export interface Ronda {
    jugadores:    string[];
    numero:       string;
    estaIniciada: null;
}

export interface TableroClass {
    id:         null;
    jugadores:  string[];
    habilitado: boolean;
    cartas:     Map<string, Carta[]>
}

export interface Carta {
    cartaId:        string;
    estaOculta:     boolean;
    estaHabilitada: boolean;
    poder:          number;
    jugadorId:      null;
}