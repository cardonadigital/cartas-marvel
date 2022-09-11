import { Component, OnInit } from '@angular/core';
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
export class LobbyComponent implements OnInit {
  idGame: string = uuidv4();

  lobby: Lobby;
  usuarios: Array<{ name: string }>;
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
    this.backend.getJuego(this.idGame).subscribe({
      next: (message: any) => console.log(message),
      error: (error) => console.log('error'),
      complete: () => console.log('object'),
    });
    console.log('backinfo');

    /* this.lobbyService.getLobby('1THZ6OUUasVBb3IMbBgsH3unwCz2').then(response=> {
      console.log(response.usuarios, this.id);
      this.lobby = response;
      this.usuarios = response.usuarios;
    }); */

    this.lobbyService.getLobby(this.id).subscribe((response) => {
      console.log(response);
      this.lobby = response;
      this.usuarios = response.usuarios;
      this.lengthUsuario = response.usuarios.length;
    });
  }

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

  entrarJuego() {
    this.juego = {
      juegoId: this.idGame,
      jugadores: { key1: 'value1', key2: 'value2' },
      jugadorPrincipalId: 'sdd',
    };
    this.backend.crearJuego(this.juego).subscribe({
      next: (juegodb) => {
        console.log(juegodb);
      },
      error:(error)=>console.log(error),
      complete:()=> console.log('juegocreado')
    });
    this.backend.getJuego(this.idGame);
    this.router.navigate(['/game']);
  }
}
