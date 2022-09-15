import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { getAuth } from '@angular/fire/auth';
import { collection, doc, Firestore, setDoc, addDoc } from '@angular/fire/firestore';
import { Lobby } from '../../models/lobby.model';
import { LobbiesService } from 'src/app/services/lobbies.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit{

  lobbies2:Array<Lobby>;
  lobbiesGame:Array<Lobby>
  lobby:Lobby;

  lobbyId = uuid.v4();

  constructor(
    private authService: AuthService, 
    private router:Router, 
    private firesStore: Firestore,
    private lobbiService: LobbiesService
    ) {
    this.lobbies2 = [{id:'string',
      usuarios: [{name:'string', id:'string'}],
      full:true}];
   }


  ngOnInit(): void {
    this.lobbiService.getLobbies().subscribe(response=> {
      this.lobbiesGame = response;
    });
  }

  logOut(){
    this.authService.louOutGoogle()
    .then(()=>{
      alert('has salido con exito');
      this.router.navigate(['/']);
    })
    .catch(error=> console.log(error));
  }

  createLobby(){
    const user = getAuth().currentUser;
    const name = user.displayName;
    const idUser = user.uid;
    this.lobby = {
      id: user.uid,
      usuarios: [{name: name, id:idUser}],
      full:false
    }
    const data = collection(this.firesStore, 'lobbies');
    const refUser = doc(data, this.lobby.id);
    return setDoc(refUser, this.lobby);
    /* return addDoc(data, this.lobby) */
  }

  createLobby2(){
    const user = getAuth().currentUser;
    const name = user.displayName;
    const idUser = user.uid;
    this.lobby = {
      id: this.lobbyId,
      usuarios: [{name: name, id:idUser}],
      full:false
    }
    const data = collection(this.firesStore, 'lobbies');
    const refUser = doc(data, this.lobby.id);
    return setDoc(refUser, this.lobby);
  }

  listaJuegos(){
    this.router.navigate(['/gamesDb']);
  }

}
