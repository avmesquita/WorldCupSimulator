import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesListComponent } from './modules/shared/components/games-list/games-list.component';
import { HomeComponent } from './modules/shared/components/home/home.component';
import { RankingComponent } from './modules/shared/components/ranking/ranking.component';
import { ScoreboardComponent } from './modules/shared/components/scoreboard/scoreboard.component';
import { TeamsListComponent } from './modules/shared/components/teams-list/teams-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'teams',
    component: TeamsListComponent
  },
  {
    path: 'games',
    component: GamesListComponent
  },
  {
    path: 'scoreboard',
    component: ScoreboardComponent
  },
  {
    path: 'ranking',
    component: RankingComponent
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
