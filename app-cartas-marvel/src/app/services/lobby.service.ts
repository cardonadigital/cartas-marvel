import { Injectable } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { arrayRemove, arrayUnion, collection, collectionData, doc, docData, Firestore, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { query, where } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Lobby } from '../models/lobby.model';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {

  constructor(private fireStore:Firestore) { }

  /* async getLobby(id:string){
    const data = collection(this.fireStore, 'lobbies');
    const refUser = doc(data, '1THZ6OUUasVBb3IMbBgsH3unwCz2');
    const docSnap = await getDoc(refUser);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data);
      return docSnap.data;
      
    } else {
      // doc.data() will be undefined in this case
      return docSnap;
    }
  } */

  /* async getLobby(id:string){
    const data = collection(this.fireStore, 'lobbies');
    const refUser = doc(data, id);
    const docSnap = await getDoc(refUser);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data() as Observable<Lobby>;
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    } return docSnap;
    
  } */

  getLobby(id:string): Observable<Lobby>{
    const data = collection(this.fireStore, 'lobbies');
    const refUser = doc(data, id);
    const docSnap = docData(refUser) as Observable<Lobby>;
    console.log(docSnap);
    return docSnap;
  }




  async addUser(id:string, name:string){
    const user = getAuth().currentUser;
    const idUser = user.uid;
    const data = collection(this.fireStore, 'lobbies');
    const refUser = doc(data, id);
    await updateDoc(refUser, {
      usuarios: arrayUnion({name:name, id:idUser})
    })
  }

  async deleteUser(id:string, name:string){
    const user = getAuth().currentUser;
    const idUser = user.uid;
    const data = collection(this.fireStore, 'lobbies');
    const refUser = doc(data, id);
    await updateDoc(refUser, {
      usuarios: arrayRemove({name:name, id:idUser})
    })
  }


}
