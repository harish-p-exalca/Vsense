import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs';
import { AppUsage, AuthenticationDetails } from 'src/app/Models/master';
import { MasterService } from 'src/app/Services/master.service';
import { VsenseapiService } from 'src/app/Services/vsenseapi.service';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.css']
})
export class ExceptionComponent implements OnInit,OnDestroy {
  @ViewChild(MatPaginator) tablePaginator: MatPaginator;
  subscription:Subscription;
  exception=[];
  paramassigns=[];
  deviceparamassignments=[];
  dataSource;
  displayedColumns:string[]=["deviceid","location","param","exception","datetime"];
  authenticationDetails: AuthenticationDetails;
  currentUserID: Guid;
  currentUserName: string;
  currentUserRole: string;
  key: string;
  constructor(public service:VsenseapiService,private _masterService:MasterService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.service.emitChange("Exceptions");
    this.service.getallexceptions().subscribe(data =>{
      this.exception=data;
      this.exception.forEach(element => {
        if(element.value<element.minValue){
          element.exception="lesser than min value";
        }
        else if(element.value>element.maxValue){
          element.exception="exceeds max value";
        }
        else{
          element.exception="exceeds threshold";
        }
      });
      this.dataSource=new MatTableDataSource(this.exception);
      this.dataSource.paginator = this.tablePaginator;
      this.spinner.hide();
    });
    const retrievedObject = localStorage.getItem('authorizationData');
      this.authenticationDetails = JSON.parse(retrievedObject) as AuthenticationDetails;
      this.currentUserID = this.authenticationDetails.UserID;
      this.currentUserName = this.authenticationDetails.UserName;
      this.currentUserRole = this.authenticationDetails.UserRole;
    this.CreateAppUsage();
  }
  handlefilter() {
    this.dataSource.filter = this.key.trim().toLowerCase();
  }
  CreateAppUsage(): void {
    const appUsage: AppUsage = new AppUsage();
    appUsage.UserID = this.currentUserID;
    appUsage.AppName = 'Exceptions';
    appUsage.UsageCount = 1;
    appUsage.CreatedBy = this.currentUserName;
    appUsage.ModifiedBy = this.currentUserName;
    this._masterService.CreateAppUsage(appUsage).subscribe(
      (data) => {
      },
      (err) => {
        console.error(err);
      }
    );
  }
  // exceptionpuller(){
  //   this.exceptions=JSON.parse(localStorage.getItem("exceptions"));
  //   this.dataSource.next(this.exceptions);
  // }
  ngOnDestroy(){
  }
  
  // exceptionpuller() {
  //   this.paramassigns.forEach(paramassign => {
  //     paramassign.parameters.forEach(param => {
  //       this.service.getdevicelog(param.device_assign.deviceID, param.pramID).subscribe((data: any) => {
  //         var log = data;
  //         log.device_Assign_Param = param;
  //         var flag = false;
  //         for (var k in this.exception) {
  //           if (this.exception[k].logID == log.logID) {
  //             flag = true;
  //             break;
  //           }
  //         }
  //         if (!flag) {
  //           if(log.value>log.threshold){
  //             log.exception = param.pramID + " threshold exceeded";
  //             this.exception.push(log);
  //           }
  //           if (log.value > log.maxValue) {
  //             log.exception = param.pramID + " max exceeded";
  //             this.exception.push(log);
  //           }
  //           else if (log.value < log.minValue) {
  //             log.exception = param.pramID + " fell behind";
  //             this.exception.push(log);
  //           }
  //         }
  //       })
  //     });
  //   });
  //   console.log(this.exception);
  //   this.dataSource=new MatTableDataSource(this.exception);
   
}
