import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { TeamsListComponent } from './components/teams-list/teams-list.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { RankingComponent } from './components/ranking/ranking.component';

@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    ScoreboardComponent,
    TeamsListComponent,
    GamesListComponent,
    RankingComponent
  ],
  exports: [
    HomeComponent,
    MenuComponent,
    ScoreboardComponent,
    TeamsListComponent,
    GamesListComponent,
    RankingComponent
  ],
  imports: [
    CommonModule    
  ]
})
export class SharedModule { }
