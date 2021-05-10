import { DatePipe } from '@angular/common';
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Guid } from 'guid-typescript';
import {  interval,Subscription  } from 'rxjs';
import { AppUsage, AuthenticationDetails } from 'src/app/Models/master';
import { ExcelService } from 'src/app/Services/excel.service';
import { MasterService } from 'src/app/Services/master.service';
import { VsenseapiService } from 'src/app/Services/vsenseapi.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from 'src/app/Services/notification.service';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  Space: string;
  Value:string
  Title: string;
  Asset:string;
  Site:string;
  Status:string;
  Lastfeed:string
}
const ELEMENT_DATA: PeriodicElement[] = [
  { Site: '5678', Space: 'Space lorem',Asset: 'Asset lorem', Title: 'Title', Value: 'Value', Status : 'Status', Lastfeed: '23/07/2020, 16:23' },
  { Site: '5678', Space: 'Space lorem',Asset: 'Asset lorem', Title: 'Title', Value: 'Value', Status : 'Status', Lastfeed: '23/07/2020, 16:23' },
  { Site: '5678', Space: 'Space lorem',Asset: 'Asset lorem', Title: 'Title', Value: 'Value', Status : 'Status', Lastfeed: '23/07/2020, 16:23' },
  { Site: '5678', Space: 'Space lorem',Asset: 'Asset lorem', Title: 'Title', Value: 'Value', Status : 'Status', Lastfeed: '23/07/2020, 16:23' },
  { Site: '5678', Space: 'Space lorem',Asset: 'Asset lorem', Title: 'Title', Value: 'Value', Status : 'Status', Lastfeed: '23/07/2020, 16:23' },
  { Site: '5678', Space: 'Space lorem',Asset: 'Asset lorem', Title: 'Title', Value: 'Value', Status : 'Status', Lastfeed: '23/07/2020, 16:23' },
  { Site: '5678', Space: 'Space lorem',Asset: 'Asset lorem', Title: 'Title', Value: 'Value', Status : 'Status', Lastfeed: '23/07/2020, 16:23' },
  { Site: '5678', Space: 'Space lorem',Asset: 'Asset lorem', Title: 'Title', Value: 'Value', Status : 'Status', Lastfeed: '23/07/2020, 16:23' },
  { Site: '5678', Space: 'Space lorem',Asset: 'Asset lorem', Title: 'Title', Value: 'Value', Status : 'Status', Lastfeed: '23/07/2020, 16:23' },
  { Site: '5678', Space: 'Space lorem',Asset: 'Asset lorem', Title: 'Title', Value: 'Value', Status : 'Status', Lastfeed: '23/07/2020, 16:23' },
  { Site: '5678', Space: 'Space lorem',Asset: 'Asset lorem', Title: 'Title', Value: 'Value', Status : 'Status', Lastfeed: '23/07/2020, 16:23' },
  { Site: '5678', Space: 'Space lorem',Asset: 'Asset lorem', Title: 'Title', Value: 'Value', Status : 'Status', Lastfeed: '23/07/2020, 16:23' },
  { Site: '5678', Space: 'Space lorem',Asset: 'Asset lorem', Title: 'Title', Value: 'Value', Status : 'Status', Lastfeed: '23/07/2020, 16:23' },
  { Site: '5678', Space: 'Space lorem',Asset: 'Asset lorem', Title: 'Title', Value: 'Value', Status : 'Status', Lastfeed: '23/07/2020, 16:23' },
  { Site: '5678', Space: 'Space lorem',Asset: 'Asset lorem', Title: 'Title', Value: 'Value', Status : 'Status', Lastfeed: '23/07/2020, 16:23' },
  { Site: '5678', Space: 'Space lorem',Asset: 'Asset lorem', Title: 'Title', Value: 'Value', Status : 'Status', Lastfeed: '23/07/2020, 16:23' },
  { Site: '5678', Space: 'Space lorem',Asset: 'Asset lorem', Title: 'Title', Value: 'Value', Status : 'Status', Lastfeed: '23/07/2020, 16:23' },
  { Site: '5678', Space: 'Space lorem',Asset: 'Asset lorem', Title: 'Title', Value: 'Value', Status : 'Status', Lastfeed: '23/07/2020, 16:23' },
];

@Component({
  selector: 'app-controldetails',
  templateUrl: './controldetails.component.html',
  styleUrls: ['./controldetails.component.scss']
})
export class ControldetailsComponent implements OnInit,OnDestroy {
// scroll button part
  @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent: ElementRef<any>;

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 260), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 260), behavior: 'smooth' });
  }
// scroll button part

  deviceparams = []; temperature=30;device;
  equipment; equipmentid;
  subscription:Subscription
  data = [];
  dummy;dummy1;
  alert_count=[];
  batteryCondition:string;
  healthCondition:string;
  currentdassign;
  alerts=[];
  
  isDisplay:boolean=true;
  isDisplayhover:boolean = false;

  //for screen width and height measurement
  public innerWidth: any;
  public innerHeight:any;

  displayedColumns: string[] = ['Site', 'Space', 'Title','Status', 'Asset', 'Value', 'Lastfeed'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);


  authenticationDetails: AuthenticationDetails;
  currentUserID: Guid;
  currentUserName: string;
  currentUserRole: string;
  constructor(public service: VsenseapiService,private excelservice:ExcelService,
    private datepipe:DatePipe,private _masterService:MasterService,
    private spinner: NgxSpinnerService,private notification:NotificationService) {}

  datapuller(){
    this.data.forEach(passign => {
        this.service.getdevicelog(this.device.deviceID,passign.pramID).subscribe(res => {
          var current_log;
          current_log=res;
          this.service.getexceptioncount(this.device.deviceID,passign.pramID).subscribe(x =>{
            current_log.alert_count=x;
          });
          passign.log=current_log;
        });
    });
    
  }
  ngOnInit(): void {
    this.alerts=JSON.parse(localStorage.getItem("alerts"));
    this.spinner.show();
    this.service.emitChange("Device Details");
    this.currentdassign=JSON.parse(localStorage.getItem('assignment'));
    this.equipment=this.currentdassign.equipment;
    this.getcurrentdevice();
    this.getallparamdetails();
    
    this.subscription = interval(15000).subscribe((func => {
      this.datapuller();
    }))
    const retrievedObject = localStorage.getItem('authorizationData');
      this.authenticationDetails = JSON.parse(retrievedObject) as AuthenticationDetails;
      this.currentUserID = this.authenticationDetails.UserID;
      this.currentUserName = this.authenticationDetails.UserName;
      this.currentUserRole = this.authenticationDetails.UserRole;
    this.CreateAppUsage();



  //for screen width and height measurement
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    console.log(this.innerWidth, this.innerHeight)
  }

  CreateAppUsage(): void {
    const appUsage: AppUsage = new AppUsage();
    appUsage.UserID = this.currentUserID;
    appUsage.AppName = 'Device Details';
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

  getallparamdetails(){
      this.service.getalldeviceassignparams().subscribe(res => {
        this.deviceparams = res;
        for (var i in this.deviceparams) {
          if(this.deviceparams[i].assignmentID==this.currentdassign.assignmentID){
            let passign=this.deviceparams[i];
            this.service.getdevicelog(this.device.deviceID,passign.pramID).subscribe(res => {
              passign.log=res;
              passign.alert_count=0;
              this.service.getexceptioncount(this.device.deviceID,passign.pramID).subscribe(x =>{
                passign.alert_count=x;
              });
            },
            (err)=>{
              const emptylog={value:0};
              passign.alert_count=0;
              passign.log=emptylog;
            });
            // console.log(passign);
            this.data.push(passign);
          }   
        }
        console.log(this.data);
        this.spinner.hide();
      },(err)=>{
        this.spinner.hide();
        this.notification.success("something went wrong");
      }); 
  }

  getcurrentdevice(){
    this.device=this.currentdassign.device;
      if(this.device.battery>=70){
        this.batteryCondition="Good";
      }
      else if(this.device.battery<70 && this.device.battery>=30){
        this.batteryCondition="Okay";
      }
      else if(this.device.battery<30 && this.device.battery>=10){
        this.batteryCondition="Bad";
      }
      else{
        this.batteryCondition="Worse";
      }
      if(this.device.healthy>=70){
        this.healthCondition="Good";
      }
      else if(this.device.healthy<70 && this.device.healthy>=30){
        this.healthCondition="Okay";
      }
      else if(this.device.healthy<30 && this.device.healthy>=10){
        this.healthCondition="Bad";
      }
      else{
        this.healthCondition="Worse";
      }
  }
  downloadToExcel(){
    var array=[];
    this.data.forEach(x => {
      let device={
        deviceID:this.device.deviceID,
        deviceName:this.device.name,
        paramName:x.title,
        equipmentID:this.equipment.equipmentID,
        equipmentName:this.equipment.text,
        locationID:x.device_assign.locID,
        locationName:x.device_assign.location.lcoationText,
        softwareVersion:this.device.softwareVersion,
        Vcc:this.device.vcc,
        Battery:this.device.battery,
        Healthy:this.device.healthy,
        PutToUseDate:this.datepipe.transform(this.device.puttoUse, 'dd-MM-yyyy')
      }
      array.push(device);
    });
    this.excelservice.exportAsExcelFile(array,this.device.deviceID);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // division hover part
  mouseEnter(){
    this.isDisplayhover= true;
    this.isDisplay = false;
 }
 mouseLeave(){
    this.isDisplay = true;
    this.isDisplayhover = false;
 }
 // division hover part
}
