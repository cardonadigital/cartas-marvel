package org.example.cardgame.usecase.usecase;

import org.example.cardgame.domain.command.CrearJuegoCommand;
import org.example.cardgame.domain.events.JuegoCreado;
import org.example.cardgame.domain.events.JugadorAgregado;
import org.example.cardgame.usecase.gateway.ListaDeCartaService;
import org.example.cardgame.usecase.gateway.model.CartaMaestra;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CrearJuegoUseCaseTest {

    @Mock
    private ListaDeCartaService repository;

    @InjectMocks
    private CrearJuegoUseCase useCase;

    @Test
    public void crearJuego(){
        //arrange
        Map<String, String> jugadores = new HashMap<>();
        jugadores.put("sss", "sss");
        jugadores.put("s", "s");
        var command = new CrearJuegoCommand();
        command.setJuegoId("ddd");
        command.setJugadores(jugadores);
        command.setJugadorPrincipalId("sss");
        when(repository.obtenerCartasDeMarvel()).thenReturn(history());

        StepVerifier.create(useCase.apply(Mono.just(command)))
                .expectNextMatches(domainEvent->{
                    var event =(JuegoCreado) domainEvent;
                    var principal = event.getJugadorPrincipal().value();
                    Assertions.assertEquals("sss", event.getJugadorPrincipal().value());
                    return "sss".equals(event.getJugadorPrincipal().value());
                }).expectNextMatches(eventoDomio->{
                    var evento = (JugadorAgregado) eventoDomio;
                    return "sss".equals(evento.getJuegoId().value());
                })
                .expectNextMatches(eventoDomio->{
                    var evento = (JugadorAgregado) eventoDomio;
                    return "s".equals(evento.getJuegoId().value());
                })
                .expectComplete()
                .verify();
    }


    private Flux<CartaMaestra> history() {
        return Flux.just(
                new CartaMaestra("dd", "ss"),
                new CartaMaestra("ss", "dffg"),
                new CartaMaestra("gg", "dffg"),
                new CartaMaestra("vv", "dffg"),
                new CartaMaestra("fdg", "dffg"),
                new CartaMaestra("a", "dffg"),
                new CartaMaestra("s", "dffg"),
                new CartaMaestra("d", "dffg"),
                new CartaMaestra("f", "dffg"),
                new CartaMaestra("g", "dffg"),
                new CartaMaestra("h", "dffg"),
                new CartaMaestra("b", "dffg")
        );
    }


}