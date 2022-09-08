package org.example.cardgame.usecase.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.domain.events.RondaIniciada;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public class IniciarCuentaRegresivaUseCase {
    public Flux<DomainEvent> apply(Mono<RondaIniciada> just) {
        return null;
    }
}
