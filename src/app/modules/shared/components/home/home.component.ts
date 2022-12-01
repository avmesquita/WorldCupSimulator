import { Component } from '@angular/core';
import { MainService } from '../../services/main.service';
//import { NestedTreeControl } from '@angular/cdk/tree';
//import { MatTreeNestedDataSource } from '@angular/material/tree';
import { IParticipantScorer } from '../../interfaces/iparticipant-scorer.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  //treeControl = new NestedTreeControl<Record<string, IParticipantScorer[]>>( (node: any) => node.children);
  //dataSource = new MatTreeNestedDataSource<Record<string, IParticipantScorer[]>>();

  constructor(public mainService: MainService) {}

  //hasChild = (_: number, node: string) => !!node.children && node.children.length > 0;
}
