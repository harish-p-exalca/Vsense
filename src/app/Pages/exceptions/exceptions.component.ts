import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  ExcepID: string;
  Space:string;
  Site:string;
  Class: string;
  Asset:string;
  Value:string;
  Status:string;
  PramID:string;
  DateTime:string;
  Assignedto:string;
  Threshold:string;
  SLAStart:string;
  Resolve:string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},
  { ExcepID:'EXC1244',Site: 'Site', Space: 'Space',Asset: 'Asset',Class: 'Class',PramID:'PramID', Value: 'Value', Status : 'Status',DateTime: '23/07/2020' ,Assignedto:'Assignedto',Threshold:'Threshold',SLAStart:'SLAStart',Resolve:''},

];

@Component({
  selector: 'app-exceptions',
  templateUrl: './exceptions.component.html',
  styleUrls: ['./exceptions.component.scss']
})
export class ExceptionsComponent implements OnInit {
  devices=[1,2,3,4,5,56,8,7];
  ParamdisplayedColumns:string[]=["Excep I’D","Site","Space","Asset","Class","PramID","Value","Date/Time",
  "Assigned To","Threshold","SLA Start","Status","Resolve"];
  ParamDataSource:MatTableDataSource<any>=new MatTableDataSource(ELEMENT_DATA);
  constructor() { }

  ngOnInit(): void {
  }

}
