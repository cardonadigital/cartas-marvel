package org.example.cardgame.usecase.usecase;

import co.com.sofka.domain.generic.DomainEvent;
import org.example.cardgame.domain.events.RondaTerminada;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public class DeterminarGanadorUseCase {
    public Flux<DomainEvent> apply(Mono<RondaTerminada> just) {
        return null;
    }
}
