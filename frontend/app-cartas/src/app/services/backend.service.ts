import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { Cartas } from '../models/cartas.model';
import { Juego } from '../models/juegoDb.model';
import { Tablero } from '../models/tablero.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private socket : any;

  constructor(private http:HttpClient) { }



  //comands
  crearJuego(juego:any){
    return this.http.post('http://localhost:8080/juego/crear', {...juego});
  }

  iniciarJuego(juegoId){
    return this.http.post('http://localhost:8080/juego/iniciar', {juegoId: juegoId});
  }

  iniciarRonda(juegoId){
    return this.http.post('http://localhost:8080/juego/ronda/iniciar', {juegoId: juegoId});
  }


  ponerCarta(jugadorId, cartaId, juegoId){
    return this.http.post('http://localhost:8080/juego/poner', {jugadorId: jugadorId, cartaId: cartaId, juegoId: juegoId});
  }



  //queries
  getJuego(idGame:string){
    this.socket = webSocket(`ws://localhost:8081/retrieve/${idGame}`);
    return this.socket;
  }

  getJuegoFinalizado(idGame){
    return this.http.get<any>(`http://localhost:8080/juego/${idGame}`);
  }

  getTablero(idGame){
    return this.http.get<Tablero>(`http://localhost:8080/juego/${idGame}`);
  }

  getCartas(idPlayer, idGame){
    return this.http.get<Cartas>(`http://localhost:8080/juego/mazo/${idPlayer}/${idGame}`);
  }

  close(){
    this.socket.unsubscribe();
  }
}
