import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LobbyService } from '../../services/lobby.service';
import { Lobby } from '../../models/lobby.model';
import { getAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { Juego } from '../../models/juego.model';
import { BackendService } from '../../services/backend.service';
import { v4 as uuidv4, v4 } from 'uuid';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
})
export class LobbyComponent implements OnInit, OnDestroy {
  /* idGame: string = uuidv4(); */

  lobby: Lobby;
  usuarios: Array<{ name: string, id:string }>;
  lengthUsuario: number;
  href = this.router.url;
  id = this.href.substring(this.href.lastIndexOf('/') + 1);

  juego: Juego;

  constructor(
    private authService: AuthService,
    private router: Router,
    private lobbyService: LobbyService,
    private backend: BackendService
  ) {}
  

  ngOnInit(): void {
    this.backend.getJuego(this.id).subscribe({
      next: (message) => {
        if (message.type = "cardgame.rondacreada") {
          this.router.navigate([`/game/${this.id}`]);
        }console.log(message);
      },
      error: (error) => console.log('error'),
      complete: () => console.log('object'),
    });

    this.lobbyService.getLobby(this.id).subscribe((response) => {
      console.log(response);
      this.lobby = response;
      this.usuarios = response.usuarios;
      this.lengthUsuario = response.usuarios.length;
      /**
       * borrar
       */
      this.getJugadorData();
    });
  }

  ngOnDestroy(): void {
    this.backend.close();
  }

  ///metodos

  logOut() {
    this.authService
      .louOutGoogle()
      .then(() => {
        alert('has salido con exito');
        this.router.navigate(['/']);
      })
      .catch((error) => console.log(error));
  }

  salirLobby() {
    const user = getAuth().currentUser;
    const name = user.displayName;
    console.log(name);
    this.lobbyService.deleteUser(this.id, name);
    this.router.navigate(['/games']);
  }

  /* entrarJuego(){
    this.router.navigate(['/game']);
  } */
  ////
  async entrarJuego() {
    let userData = JSON.parse(this.getJugadorData());
    this.juego = {
      juegoId: this.id,
      jugadores: userData,
      jugadorPrincipalId: this.id,
    };
    await this.backend.crearJuego(this.juego).subscribe({
      next: (juegodb) => {
        console.log(juegodb);
      },
      error:(error)=>console.log(error),
      complete:()=> console.log('juegocreado')
    });

    await this.backend.iniciarJuego(this.id).subscribe({
      next: (juegodb) => {
        console.log(juegodb);
      },
      error:(error)=>console.log(error),
      complete:()=> console.log('juegocreado')
    });

    this.backend.getJuego(this.id).subscribe({
      next: (juegodb) => {
        console.log(juegodb);
      },
      error:(error)=>console.log(error),
      complete:()=> console.log('juegocreado')
    });
    /* this.router.navigate(['/game']); */
    console.log(this.usuarios);
  }


  getJugadorData():string{
    let data:string;
    for (let i = 0; i < this.usuarios.length; i++) {
      let id = this.usuarios[i].id;
      let name = this.usuarios[i].name;
      if (i!= 0) {
        data+= ',';
      }else{
        data = '';
      }
      data+= `"${id}"` + ':' + `"${name}"`;
    }
    data = `{${data}}`;
    console.log(data);
    return data;
  }
}
