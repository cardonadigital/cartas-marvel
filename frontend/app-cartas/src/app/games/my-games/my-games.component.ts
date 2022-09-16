import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { mapToStyles } from '@popperjs/core/lib/modifiers/computeStyles';
import { Juegos, Ganador } from '../models/juegos.model';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['./my-games.component.css']
})
export class MyGamesComponent implements OnInit {

  //para pintar
  juegos: Juegos[];
  myJuegos: Juegos[] = new Array();

  //usuario fire
  user = getAuth().currentUser;
  idUser = this.user.uid;

  constructor(private router:Router, private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get<Juegos[]>('http://localhost:8080/juego/listar').subscribe(res=> {
      this.juegos=res;
      this.agregarJuegos();
  });
    console.log(this.juegos);
  }


  volver(){
    this.router.navigate(['/games']);
  }

  agregarJuegos(){
    this.juegos.map((juego)=>{
      let jugadores: Map<string, Set<any>> = juego.jugadores;
      console.log(juego);

      for (const jugador in jugadores) {
        if (jugador == this.idUser) {
          this.myJuegos.push(juego);
        }
      }
    });
  }

}
