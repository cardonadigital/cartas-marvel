import { Component, OnDestroy, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  //datos backend
  cartas: any= "";
  tiempo: number = 0;
  cartasTablero:Array<string> = new Array();
  botonHabilitado:boolean = false;
  ronda:any = 1;

  //id page
  href = this.router.url;
  idGame = this.href.substring(this.href.lastIndexOf('/') + 1);


  //usuario firebase
  user = getAuth().currentUser;
  idUser = this.user.uid;
  name = this.user.displayName;


  constructor(private back:BackendService, private router: Router) { }
  

  ngOnInit(): void {
    this.back.getJuego(this.idGame).subscribe({
      next: (message) => {
        switch (message.type) {
          case "cardgame.rondacreada":
            this.traerCartas();
            this.botonHabilitado = false;
            this.cartasTablero = new Array();
            break;
          case "cardgame.tiempocambiadodeltablero":
            this.tiempo = message.tiempo;
            this.botonHabilitado = true;
            break;
          case "cardgame.ponercartaentablero":
            this.agregarCartaTablero();
            break;
          case "cardgame.juegofinalizado":
            this.router.navigate([`/winner/${this.idGame}`]);
            console.log('finalizadolllllllllllllllllllllllllll');
            this.router.navigate([`/winner/${this.idGame}`]);
            this.router.navigate([`/winner/err`]);
            break;
            /* case "cardgame.rondaterminada":
              this.ronda++;
            break; */
          default:
            break;
        }
      },
      error: (error) => console.log('error'),
      complete: () => console.log('object'),
    });
    this.traerCartas();
    this.iniciarJuego();
  }

  /* ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  } */


  /* traerTablero(){
    this.back.getTablero(this.idGame).subscribe(response=>{
      this.ronda = response.tablero.ronda.numero;
    });
  } */

  agregarCartaTablero(){
    this.cartasTablero.push('1');
  }

  iniciarJuego(){
    this.back.iniciarJuego(this.idGame).subscribe({
      next: (juegodb) => {
        console.log(juegodb);
      },
      error:(error)=>console.log(error),
      complete:()=> console.log('juegocreado')
    });
  }

  traerCartas(){
    this.back.getCartas(this.idUser, this.idGame).subscribe({
      next:(response)=>{
        if (response == null) {
          console.log(response);
        }else{ this.cartas = response.cartas;}
      },
      error:(error)=>console.log(error),
      complete:()=> console.log('juegocreado')
    });
  }


  ponerCarta(event:Event){
    let cartaId = (<HTMLInputElement>event.target).value;
    console.log(this.idUser, cartaId, this.idGame);
    this.back.ponerCarta(this.idUser, cartaId, this.idGame).subscribe({
      next: (juegodb) => {
        console.log(juegodb);
      },
      error:(error)=>console.log(error),
      complete:()=> console.log('juegocreado')
    });
  }


  iniciarRonda(){
    this.back.iniciarRonda(this.idGame).subscribe({
      next: (juegodb) => {
        console.log(juegodb);
      },
      error:(error)=>console.log(error),
      complete:()=> console.log('rondainiciada')
    });
    /* if (this.idUser == this.idGame) {
      this.back.iniciarRonda(this.idGame).subscribe({
        next: (juegodb) => {
          console.log(juegodb);
        },
        error:(error)=>console.log(error),
        complete:()=> console.log('juegocreado')
      });
    }else{
      alert('solo el jugador principal puede iniciar')
    } */
  }

}
