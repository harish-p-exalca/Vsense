import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
// import * as moment from 'moment';
import { Moment } from 'moment';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';
@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss'],

})
export class SpaceComponent implements OnInit {
  devices=[1,2,3,4,5,56,8,7];
  ParamdisplayedColumns:string[]=["ParamID","Title","Unit","LongText","Min","Max","Action"];
  ParamDataSource:MatTableDataSource<any>=new MatTableDataSource(this.devices);

  
  //input field color
  isFocused:boolean = true;
  isFocused1:boolean = true;
  isFocused2:boolean = true;
  isFocused3:boolean = true;
  isFocused4:boolean = true;
 
  constructor() { }

  ngOnInit(): void {
  }

}

