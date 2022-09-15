package org.example.cardgame.usecase.usecase;

import org.example.cardgame.domain.command.CrearJuegoCommand;
import org.example.cardgame.domain.events.JuegoCreado;
import org.example.cardgame.domain.events.JugadorAgregado;
import org.example.cardgame.domain.values.JuegoId;
import org.example.cardgame.usecase.gateway.ListaDeCartaService;
import org.example.cardgame.usecase.gateway.model.CartaMaestra;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.HashMap;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CrearJuegoUseCaseTest {

    @Mock
    private ListaDeCartaService service;

    @InjectMocks
    private CrearJuegoUseCase useCase;

    @Test
    void crearJuegoHappyPass(){
        //Arange
        var juegoId = JuegoId.of("ss");
        var jugadores = new HashMap<String,String>();
        jugadores.put("k1","dddd");
        jugadores.put("k2","xxxx");
        var comando = new CrearJuegoCommand(juegoId.value(),jugadores,"k1");

        when(service.obtenerCartasDeMarvel()).thenReturn(cartasJuego());

        StepVerifier.create(useCase.apply(Mono.just(comando)))
                .expectNextMatches(eventoDominio->{
                    var evento = (JuegoCreado) eventoDominio;
                    return "ss".equals(evento.aggregateRootId());
                })
                .expectNextMatches(eventoDomio->{
                    var evento = (JugadorAgregado) eventoDomio;
                    return "k1".equals(evento.getJugadorId().value());
                })
                .expectNextMatches(eventoDomio->{
                    var evento = (JugadorAgregado) eventoDomio;
                    return "k2".equals(evento.getJugadorId().value());
                })
                .expectComplete()
                .verify();

    }

    private Flux<CartaMaestra> cartasJuego() {

        return Flux.just(
                new CartaMaestra("cadf","prueba #1", "img.jpg"),
                new CartaMaestra("cfd2","prueba #2", "img.jpg"),
                new CartaMaestra("cadf","prueba #3", "img.jpg"),
                new CartaMaestra("cdsf","prueba #5", "img.jpg"),
                new CartaMaestra("cdf","prueba #6", "img.jpg"),
                new CartaMaestra("cs","prueba #7", "img.jpg"),
                new CartaMaestra("casad","prueba #8", "img.jpg"),
                new CartaMaestra("cadfssa","prueba #9", "img.jpg"),
                new CartaMaestra("cf","prueba #10", "img.jpg"),
                new CartaMaestra("sad","ewr #10", "img.jpg"),
                new CartaMaestra("dere","ewre0", "img.jpg"),
                new CartaMaestra("derer4e","pewr10", "img.jpg")

        );
    }

}
