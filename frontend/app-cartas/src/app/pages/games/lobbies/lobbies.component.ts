import { Component, Input, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { getDocs, QuerySnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Lobby } from '../../../models/lobby.model';
import { LobbyService } from '../../../services/lobby.service';

@Component({
  selector: 'app-lobbies',
  templateUrl: './lobbies.component.html',
  styleUrls: ['./lobbies.component.css']
})
export class LobbiesComponent {
  @Input()
  lobbi:Lobby;

  @Input() index: number;

  lobbyName:string;
  lobby: Lobby;
  

  constructor(private router: Router, private lobbyService:LobbyService) {
    
   }

   async ingresarLobby(players:number, id:string){
      if(players < 5){ 
        const user = getAuth().currentUser;
        const name = user.displayName;
        this.lobbyService.addUser(id, name);
        this.router.navigate([`lobby/${id}`]);
        /* this.lobbyService.deleteUser(id); */
      }else{
        alert('lobby lleno');
      }
       
   }

   eliminar(lobbyId){
    const user = getAuth().currentUser;
    const name = user.displayName;
    this.lobbyService.deleteDocument(lobbyId);
    console.log('eliminado');
   }

}
