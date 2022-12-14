package org.example.cardgame.domain;

import co.com.sofka.domain.generic.Entity;
import org.example.cardgame.domain.values.Carta;
import org.example.cardgame.domain.values.JugadorId;
import org.example.cardgame.domain.values.TableroId;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * The type Tablero.
 */
public class Tablero extends Entity<TableroId> {
    private Integer tiempoEnSegundos;
    private Boolean estaHabilitado;
    private final Map<JugadorId, List<Carta>> partida;

    public Tablero(TableroId entityId, Set<JugadorId> jugadorIds) {
        super(entityId);
        this.partida = new HashMap<>();
        this.estaHabilitado = false;
        jugadorIds.forEach(jugadorId -> partida.put(jugadorId, new ArrayList<>()));
    }

    public void ajustarTiempo(Integer tiempo){
        this.tiempoEnSegundos = tiempo;
    }


    public Integer tiempo() {
        return tiempoEnSegundos;
    }

    public void adicionarPartida(JugadorId jugadorId, Carta carta){
        partida.getOrDefault(jugadorId, new ArrayList<>()).add(carta);
    }

    public void quitarCarta(JugadorId jugadorId, Carta carta){
        partida.getOrDefault(jugadorId, new ArrayList<>()).remove(carta);
    }

    public void habilitarApuesta(){
        this.estaHabilitado = true;
    }

    public void inhabilitarApuesta(){
        this.estaHabilitado = false;
    }

    public void reiniciarPartida(){
        partida.clear();
    }

    public Boolean estaHabilitado() {
        return estaHabilitado;
    }

    public Map<JugadorId, List<Carta>> partida() {
        return partida;
    }

    public Integer getCartasEnTablero(){
        var numero = 0;
        for (Map.Entry<JugadorId, List<Carta>> entry : partida.entrySet()) {
            if (entry.getValue().size() != 0){
                numero++;
            }
        }
        System.out.println(numero);
        return numero;
    }
}
