import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesComponent } from './pages/games/games.component';
import { LogingComponent } from './pages/loging/loging.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { GameComponent } from './pages/game/game.component';
import { GamesDbComponent } from './games/games-db/games-db.component';
import { WinnerComponent } from './pages/winner/winner.component';

const routes: Routes = [
  {path:'', component:LogingComponent},
  {path:'games', component:GamesComponent, ...canActivate(()=> redirectUnauthorizedTo(['/']))},
  {path:'game/:id', component:GameComponent, ...canActivate(()=> redirectUnauthorizedTo(['/']))},
  {path:'lobby/:id', component:LobbyComponent, ...canActivate(()=> redirectUnauthorizedTo(['/']))},
  {path:'gamesDb', component:GamesDbComponent, ...canActivate(()=> redirectUnauthorizedTo(['/']))},
  {path:'winner/:id', component:WinnerComponent, ...canActivate(()=> redirectUnauthorizedTo(['/']))}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  static routes(routes: any): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
    throw new Error('Method not implemented.');
  }
}
