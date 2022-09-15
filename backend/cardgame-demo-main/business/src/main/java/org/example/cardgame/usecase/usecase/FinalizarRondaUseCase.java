package org.example.cardgame.usecase.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.domain.Juego;
import org.example.cardgame.domain.command.FinalizarRondaCommand;
import org.example.cardgame.domain.values.Carta;
import org.example.cardgame.domain.values.JuegoId;
import org.example.cardgame.domain.values.JugadorId;
import org.example.cardgame.usecase.gateway.JuegoDomainEventRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.stream.Collectors;

public class FinalizarRondaUseCase extends UseCaseForCommand<FinalizarRondaCommand> {

    private final JuegoDomainEventRepository repository;

    public FinalizarRondaUseCase(JuegoDomainEventRepository repository){
        this.repository = repository;
    }

    @Override
    public Flux<DomainEvent> apply(Mono<FinalizarRondaCommand> iniciarJuegoCommand) {
        return iniciarJuegoCommand.flatMapMany((command) -> repository
                .obtenerEventosPor(command.getJuegoId())
                .collectList()
                .flatMapIterable(events -> {

                    var juego = Juego.from(JuegoId.of(command.getJuegoId()), events);
                    TreeMap<Integer, String> partidaOrdenada = new TreeMap<>((t1, t2) -> t2 - t1);
                    Set<Carta> cartasEnTablero = new HashSet<>();
                    juego.tablero().partida().forEach((jugadorId, cartas) -> {
                        /*cartasEnTablero.add(cartas.iterator().next());*/
                        cartas.stream()
                                .map(c -> c.value().poder())
                                .reduce(Integer::sum)
                                .ifPresent(puntos -> {
                                    partidaOrdenada.put(puntos, jugadorId.value());
                                    cartasEnTablero.add(cartas.iterator().next());
                                    /*cartasEnTablero.addAll(cartas);*/
                                });
                    });

                    var competidores = partidaOrdenada.values()
                            .stream()
                            .map(JugadorId::of)
                            .collect(Collectors.toSet());
                    var partida =  partidaOrdenada.firstEntry();

                    if (partida == null){
                        juego.terminarRonda(juego.tablero().identity(), competidores);
                        return juego.getUncommittedChanges();
                    }
                    var ganadorId = partida.getValue();
                    var puntos = partida.getKey();

                    //verificar ganador

                    juego.asignarCartasAGanador(JugadorId.of(ganadorId), puntos, cartasEnTablero);
                    juego.terminarRonda(juego.tablero().identity(), competidores);

                    /*//verificar ganador juego
                    Map<Set<Carta>, String> cartasJugadores = new HashMap<>();
                    juego.jugadores().forEach((uid, jugador)->{
                        if (jugador.mazo().value().cartas().size() != 0){
                            cartasJugadores.put(jugador.mazo().value().cartas(), jugador.alias());
                        }
                    });

                    if (cartasJugadores.size() == 1){
                        var alias = cartasJugadores.values().toString();
                        juego.finalizarJuego(JugadorId.of(ganadorId), alias);
                        System.out.println("juego finalizado");
                    }*/
                    return juego.getUncommittedChanges();

                }));
    }


}

