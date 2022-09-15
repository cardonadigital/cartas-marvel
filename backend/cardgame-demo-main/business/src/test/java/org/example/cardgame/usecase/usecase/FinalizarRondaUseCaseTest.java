package org.example.cardgame.usecase.usecase;


import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.domain.Tablero;
import org.example.cardgame.domain.command.FinalizarRondaCommand;
import org.example.cardgame.domain.events.CartaPuestaEnTablero;
import org.example.cardgame.domain.events.CartasAsignadasAJugador;
import org.example.cardgame.domain.events.JuegoCreado;
import org.example.cardgame.domain.events.JugadorAgregado;
import org.example.cardgame.domain.events.RondaCreada;
import org.example.cardgame.domain.events.RondaIniciada;
import org.example.cardgame.domain.events.RondaTerminada;
import org.example.cardgame.domain.events.TableroCreado;
import org.example.cardgame.domain.values.Carta;
import org.example.cardgame.domain.values.CartaMaestraId;
import org.example.cardgame.domain.values.JugadorId;
import org.example.cardgame.domain.values.Mazo;
import org.example.cardgame.domain.values.Ronda;
import org.example.cardgame.domain.values.TableroId;
import org.example.cardgame.usecase.gateway.JuegoDomainEventRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.Set;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class FinalizarRondaUseCaseTest {

    @InjectMocks
    private FinalizarRondaUseCase useCase;

    @Mock
    private JuegoDomainEventRepository repository;

    @Test
    void finalizarRondaPass(){
        //arrange
        var command = new FinalizarRondaCommand();
        command.setJuegoId("123");

        when(repository.obtenerEventosPor("123")).thenReturn(eventos());

        StepVerifier.create(useCase.apply(Mono.just(command)))//act
                .expectNextMatches(domainEvent -> {
                    var event = (CartasAsignadasAJugador) domainEvent;
                    return "yyyyy".equals(event.getGanadorId().value());
                })
                .expectNextMatches(domainEvent -> {
                    var event = (RondaTerminada) domainEvent;
                    return "123".equals(event.getTableroId().value());
                })
                .expectComplete()
                .verify();
    }

    private Flux<DomainEvent> eventos() {
        var jugadorId = JugadorId.of("yyyyy");
        var jugador2Id = JugadorId.of("hhhhhh");
        var carta1 = new Carta(
                CartaMaestraId.of("xxxxx"),
                20,
                false, true, "img.jpg"
        );
        var carta11 = new Carta(
                CartaMaestraId.of("kkkkk"),
                40,
                false, true, "img.jpg"
        );
        var carta2 = new Carta(
                CartaMaestraId.of("eeeee"),
                10,
                false, true, "img.jpg"
        );
        var carta22 = new Carta(
                CartaMaestraId.of("ddddd"),
                15,
                false, true, "img.jpg"
        );
        var cartas = Set.of(carta1);
        var tableroId = new TableroId("123");
        var ronda = new Ronda(1, Set.of(jugadorId, jugador2Id));
        return Flux.just(
                new JuegoCreado(jugadorId),
                new JugadorAgregado(jugadorId, "raul", new Mazo(cartas)),
                new TableroCreado(tableroId, Set.of(jugadorId, jugador2Id)),
                new RondaCreada(ronda, 30),
                new RondaIniciada(),
                new CartaPuestaEnTablero(tableroId, jugador2Id, carta2),
                new CartaPuestaEnTablero(tableroId, jugadorId, carta11),
                new CartaPuestaEnTablero(tableroId, jugador2Id, carta22),
                new CartaPuestaEnTablero(tableroId, jugadorId, carta1)
        );
    }


}
