import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {trigger, state, style, animate, transition} from '@angular/animations';
@Component({
  selector: 'app-edgegroup',
  templateUrl: './edgegroup.component.html',
  styleUrls: ['./edgegroup.component.scss'],
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
export class EdgegroupComponent implements OnInit {
  devices=[1,2,3,4,5,56,8,7];
  ParamdisplayedColumns:string[]=["ParamID","Title","Unit","LongText","Min","Max","Icon","Percentage","Color","Action"];
  ParamDataSource:MatTableDataSource<any>=new MatTableDataSource(this.devices);

  state: string = 'default';
  
  //input field color
  isFocused:boolean = true;
  isFocused1:boolean = true;
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
