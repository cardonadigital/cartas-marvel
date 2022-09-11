import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Lobby } from '../models/lobby.model';

@Injectable({
  providedIn: 'root'
})
export class LobbiesService {
  

  constructor(private firesTore:Firestore) { }

  getLobbies(): Observable<Lobby[]>{
    const data = collection(this.firesTore, 'lobbies');
    let eo = collectionData(data) as Observable<Lobby[]>
    console.log(eo);
    return eo;
  }
}
