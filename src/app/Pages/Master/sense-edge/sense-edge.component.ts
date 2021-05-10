import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-sense-edge',
  templateUrl: './sense-edge.component.html',
  styleUrls: ['./sense-edge.component.scss']
})
export class SenseEdgeComponent implements OnInit {
  devices=[1,2,3,4,5,56,8,7];
  ParamdisplayedColumns:string[]=["ParamID","Title","Unit","LongText","Min","Max","Action"];
  ParamDataSource:MatTableDataSource<any>=new MatTableDataSource(this.devices);
  constructor() { }

  ngOnInit(): void {
  }

}
