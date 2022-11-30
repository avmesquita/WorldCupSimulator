import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';

@NgModule({
  declarations: [
    HomeComponent,
    MenuComponent,
    ScoreboardComponent
  ],
  exports: [
    HomeComponent,
    MenuComponent,
    ScoreboardComponent
  ],
  imports: [
    CommonModule    
  ]
})
export class SharedModule { }
