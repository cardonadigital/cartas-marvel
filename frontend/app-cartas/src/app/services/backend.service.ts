import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Juego } from '../models/juego.model';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private socket : WebSocketSubject<unknown>;

  constructor(private http:HttpClient) { }

  crearJuego(juego:any){
    return this.http.post('http://localhost:8080/juego/crear', {...juego});
  }

  getJuego(idGame:string){
    this.socket = webSocket(`ws://localhost:8081/retrieve/${idGame}`);
    return this.socket;
  }

  close(){
    this.socket.unsubscribe();
  }
}
