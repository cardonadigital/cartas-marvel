import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-games-db',
  templateUrl: './games-db.component.html',
  styleUrls: ['./games-db.component.css']
})
export class GamesDbComponent implements OnInit {

  juegos:any;

  constructor(private router:Router, private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8080/juego/listar').subscribe(res=> {this.juegos=res;
    console.log(res);
  });
    console.log(this.juegos);
  }


  volver(){
    this.router.navigate(['/games']);
  }

}
