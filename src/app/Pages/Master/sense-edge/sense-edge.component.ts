import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-sense-edge',
  templateUrl: './sense-edge.component.html',
  styleUrls: ['./sense-edge.component.scss'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(45deg)' })),
      transition('rotated => default', animate('400ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
  ])
]
})
export class SenseEdgeComponent implements OnInit {
  devices=[1,2,3,4,5,56,8,7];
  ParamdisplayedColumns:string[]=["ParamID","Title","Unit","LongText","Min","Max","Action"];
  ParamDataSource:MatTableDataSource<any>=new MatTableDataSource(this.devices);
//animation
  state: string = 'default';

  //input field color
  isFocused:boolean = true;
  isFocused1:boolean = true;
  isFocused2:boolean = true;
  isFocused3:boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
  //image angular animation
  rotate() {
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }
  menuClosed(){
    this.rotate();
  }
    //image angular animation
}
