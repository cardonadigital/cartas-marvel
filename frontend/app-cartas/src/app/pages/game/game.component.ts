import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  private idGame:string;


  constructor(private back:BackendService) { }
  

  ngOnInit(): void {
    /* this.back.getJuego().subscribe({
      next:(message:any)=>console.log(message),
      error:(error)=> console.log('error'),
      complete:(()=>console.log('object'))
    });
    console.log('backinfo'); */
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }



}
