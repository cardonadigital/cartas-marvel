import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesDbComponent } from './games-db/games-db.component';
import { MyGamesComponent } from './my-games/my-games.component';



@NgModule({
  declarations: [
    GamesDbComponent,
    MyGamesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GamesModule { }
