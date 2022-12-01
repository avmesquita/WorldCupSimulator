import { Component } from '@angular/core';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent {

  constructor(public mainService: MainService) {}

}
