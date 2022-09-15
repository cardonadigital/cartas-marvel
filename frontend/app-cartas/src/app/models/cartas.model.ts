export interface Cartas {
    cantidad: number;
    cartas:   Carta[];
}

export interface Carta {
    cartaId:        string;
    estaOculta:     boolean;
    estaHabilitada: boolean;
    poder:          number;
    jugadorId:      string;
}