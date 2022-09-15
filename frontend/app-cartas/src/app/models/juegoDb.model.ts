export interface Juego {
    id:                string;
    iniciado:          boolean;
    finalizado:        boolean;
    uid:               string;
    cantidadJugadores: number;
    jugadores:         { [key: string]: Ganador };
    ganador:           Ganador;
}

export interface Ganador {
    alias:     string;
    jugadorId: string;
}