import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackendService } from '../../services/backend.service';
import { Ganador } from 'src/app/models/juegoDb.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.css']
})
export class WinnerComponent implements OnInit {

  jugadores:any = "";
  ganador : any = "";

  constructor(private back:BackendService, private router:Router) { }

  ngOnInit(): void {
    this.back.getJuegoFinalizado('1').subscribe({
      next: (juegodb) => {
        this.jugadores = juegodb;
        this.ganador = juegodb;
      },
      error:(error)=>console.log(error),
      complete:()=> console.log('finalizado')
    });;
    console.log(this.ganador);
  }

  volver(){
    this.router.navigate(['/games']);
  }

}
