import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loging',
  templateUrl: './loging.component.html',
  styleUrls: ['./loging.component.css']
})
export class LogingComponent {

  constructor(private authService: AuthService, private router: Router) {
   }

  ingresar(){
    this.authService.logGoogle()
    .then(response=>{
      this.authService.sendDataLog(response.user);
      this.router.navigate(['/games']);
    })
    .catch(error=> console.log(error));
  }

}
