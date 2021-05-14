import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  devices=[1,2,3,4,5,56,8,7];
  ParamdisplayedColumns:string[]=["ParamID","Title","Unit","LongText","Min","Max","Action"];
  ParamDataSource:MatTableDataSource<any>=new MatTableDataSource(this.devices);

  
  //input field color
  isFocused:boolean = true;
  isFocused1:boolean = true;
  isFocused2:boolean = true;
  isFocused3:boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
