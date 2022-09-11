import { Injectable } from '@angular/core';
import { signInWithPopup, Auth, User, signOut } from '@angular/fire/auth';
import { addDoc, collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: Usuario;


  constructor(private auth : Auth, private firesStore: Firestore) {
   }


  logGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  louOutGoogle(){
    return signOut(this.auth);
  }

  sendDataLog(usuario:User){
    this.usuario = {
      id: usuario.uid,
      name: usuario.displayName,
      email: usuario.email,
      picture: usuario.photoURL
    }
    console.log(this.usuario.id);
    const data = collection(this.firesStore, 'usuario');
    const refUser = doc(data, this.usuario.id);
    return setDoc(refUser, this.usuario);
  }
  
}
