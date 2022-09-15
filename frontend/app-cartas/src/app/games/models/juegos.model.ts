export interface Juegos {
    array: any;
    id:                string;
    iniciado:          boolean;
    finalizado:        boolean;
    uid:               string;
    cantidadJugadores: number;
    jugadores:         Map<string, Set<Ganador>>
    ganador:           Ganador | null;
}

export interface Ganador {
    alias:     string;
    jugadorId: string;
}
