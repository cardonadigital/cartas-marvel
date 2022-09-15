package org.example.cardgame.usecase.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.domain.Juego;
import org.example.cardgame.domain.command.FinalizarRondaCommand;
import org.example.cardgame.domain.command.IniciarRondaCommand;
import org.example.cardgame.domain.values.Carta;
import org.example.cardgame.domain.values.JuegoId;
import org.example.cardgame.domain.values.JugadorId;
import org.example.cardgame.usecase.gateway.JuegoDomainEventRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class IniciarRondaUseCase extends UseCaseForCommand<IniciarRondaCommand> {

    private final JuegoDomainEventRepository repository;

    public IniciarRondaUseCase(JuegoDomainEventRepository repository) {
        this.repository = repository;
    }

    @Override
    public Flux<DomainEvent> apply(Mono<IniciarRondaCommand> iniciarJuegoCommand) {
        return iniciarJuegoCommand.flatMapMany((command) -> repository
                .obtenerEventosPor(command.getJuegoId())
                .collectList()
                .flatMapIterable(events -> {
                    var juego = Juego.from(JuegoId.of(command.getJuegoId()), events);
                    juego.iniciarRonda();


                    /*//verificar ganador juego
                    Map<Set<Carta>, String> cartasJugadores = new HashMap<>();
                    List<String> idPlayer = new ArrayList<>();
                    juego.jugadores().forEach((uid, jugador)->{
                        if (jugador.mazo().value().cartas().size() != 0){
                            cartasJugadores.put(jugador.mazo().value().cartas(), jugador.alias());
                            idPlayer.add(uid.toString());
                        }
                    });

                    if (cartasJugadores.size() == 1){
                        var alias = cartasJugadores.values().toString();
                        juego.finalizarJuego(JugadorId.of(idPlayer.get(0)), alias);
                        System.out.println("juego finalizado");
                    }*/

                    return juego.getUncommittedChanges();
                }));
    }
}
