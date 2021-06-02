import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Guid } from 'guid-typescript';
import { AuthenticationDetails } from 'src/app/Models/master';
import { VsenseapiService } from 'src/app/Services/vsenseapi.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MonitorTableView } from 'src/app/Models/monitor';
import { MEdge } from 'src/app/Models/site';
import { AssignParamLogView, ControlCenterFeed } from 'src/app/Models/control-center';

@Component({
  selector: 'app-controldetails',
  templateUrl: './controldetails.component.html',
  styleUrls: ['./controldetails.component.scss']
})
export class ControldetailsComponent implements OnInit, OnDestroy {

  @ViewChild('widgetsContent', { read: ElementRef }) public widgetsContent: ElementRef<any>;
  Assignment:MonitorTableView;
  EdgeDevice:MEdge=new MEdge();
  LastPull:Date=new Date();
  LastLogData:AssignParamLogView[]=[];
  Signals:AssignParamLogView[]=[];
  isDisplay: boolean = true;
  isDisplayhover: boolean = false;
  public innerWidth: any;
  public innerHeight: any;
  ControlCenterFeeds:ControlCenterFeed[]=[];

  FeedDisplayedColumns: string[] = ['Site', 'Space', 'Title', 'Asset', 'Value', 'Lastfeed', 'Status'];
  FeedDataSource:MatTableDataSource<ControlCenterFeed>;

  authenticationDetails: AuthenticationDetails;
  currentUserID: Guid;
  currentUserName: string;
  currentUserRole: string;
  constructor(public service: VsenseapiService,
    private spinner: NgxSpinnerService,
    private router: Router) {

  }

  ngOnInit(): void {
    this.Assignment = JSON.parse(localStorage.getItem('assignment'));
    const retrievedObject = localStorage.getItem('authorizationData');
    this.authenticationDetails = JSON.parse(retrievedObject) as AuthenticationDetails;
    this.currentUserID = this.authenticationDetails.UserID;
    this.currentUserName = this.authenticationDetails.UserName;
    this.currentUserRole = this.authenticationDetails.UserRole;

    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    console.log(this.innerWidth, this.innerHeight)
    this.GetEdge(this.Assignment.EdgeID);
    this.GetLastLogData(this.Assignment.EdgeID); 
    this.GetControlCenterFeeds();
  }
  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 500), behavior: 'smooth' });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 500), behavior: 'smooth' });
  }

  GetEdge(edgeID:number){
    this.spinner.show();
    this.service.GetMEdge(edgeID).subscribe(res=>{
      this.EdgeDevice=<MEdge>res;
      this.spinner.hide();
    },
    err=>{
      console.log(err);
      this.spinner.hide();
    });
  }

  GetLastLogData(edgeID:number){
    this.spinner.show();
    this.service.GetLastLogOfParams(edgeID).subscribe(res=>{
      this.LastLogData=<AssignParamLogView[]>res;
      this.Signals=this.LastLogData.filter(x=>x.IsLogExist==true);
      this.spinner.hide();
    },
    err=>{
      console.log(err);
      this.spinner.hide();
    });
  }

  GetControlCenterFeeds(){
    this.spinner.show();
    this.service.GetControlCenterFeed().subscribe(res=>{
      this.ControlCenterFeeds=<ControlCenterFeed[]>res;
      this.FeedDataSource=new MatTableDataSource(this.ControlCenterFeeds);
      this.spinner.hide();
    },
    err=>{
      console.log(err);
      this.spinner.hide();
    });
  }

  ngOnDestroy() {
    localStorage.removeItem('assignment');
  }

  mouseEnter() {
    this.isDisplayhover = true;
    this.isDisplay = false;
  }
  mouseLeave() {
    this.isDisplay = true;
    this.isDisplayhover = false;
  }

  BackToMonitor() {
    this.router.navigate(['/monitor']);
  }
  GetTimeDiff(date:string):string{
    let updatedDate= new Date(date);
    let currentDate = new Date();
    let diffMs = (currentDate.getTime() - updatedDate.getTime()); // milliseconds
    let diffDays = Math.floor(diffMs / 86400000); // days
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    if(diffDays>0){
      if(diffDays==1){
        return diffDays+" day ago";
      }
      return diffDays+" days ago";
    }
    else if(diffHrs>0){
      if(diffHrs==1 && diffMins==1){
        return diffHrs+" hour "+diffMins+"minute ago"
      }
      else if(diffHrs==1){
        return diffHrs+" hour ago"
      }
      return diffHrs+" hours ago"
    }
    else{
      if(diffMins<1){
        return " just now";
      }
      else if(diffMins==1){
        return diffMins + " minute ago";
      }
      return diffMins + " minutes ago";
    }
  }
}
