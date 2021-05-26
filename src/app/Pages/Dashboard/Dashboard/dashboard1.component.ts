import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartDataSets, ChartOptions } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';
import { Color, Label } from 'ng2-charts';
import { Router } from '@angular/router';
import { VsenseapiService } from 'src/app/Services/vsenseapi.service';
import { User } from 'src/app/Models/user';
import { interval, Subscription } from 'rxjs';
import { NotificationService } from 'src/app/Services/notification.service';
import { ExcelService } from 'src/app/Services/excel.service';
import { DatePipe } from '@angular/common';
import { AppUsage, AuthenticationDetails } from 'src/app/Models/master';
import { Guid } from 'guid-typescript';
import { MasterService } from 'src/app/Services/master.service';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.css']
})
export class Dashboard1Component implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) tablePaginator: MatPaginator;
  subscription: Subscription;
  subscription1: Subscription;
  key: string;
  deviceassigns = [];
  chart; active_count; inactive_count;
  data_arr = []; labels = [];
  loading = false;
  users: User[];
  recentlyUpdated = [];
  allDevices = [];
  isAll = false;
  deviceStatus = [];
  totalDevices:number;
 
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  thisMonth = this.monthNames[new Date().getMonth()];;
  authenticationDetails: AuthenticationDetails;
  currentUserID: Guid;
  currentUserName: string;
  currentUserRole: string;

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          gridLines: { display: false },
          type: 'time',
          time: {
            unit: 'day',
        },
          scaleLabel: {
            display: true,
            labelString: 'Date'
          },
          ticks:{
            min:''
          }
        }

      ],
      yAxes: [
        {
          display: true,
          ticks: {
            max: 15,
            min: 0,
            stepSize: 5
          },
          scaleLabel: {
            display: true,
            labelString: 'Device'
          },
        }
      ]
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#e46c53',
      backgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      borderWidth: 3.5
    },
    {
      borderColor: '#3991dc',
      backgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      borderWidth: 3.5
    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  array;
  displayedColumns: string[] = ['equipmentname', 'location', 'equipmentid', 'device', 'parameter1', 'parameter2', "parameter3", "parameter4", 'isenable', 'action'];
  dataSource;
  deviceparamassignments;
  paramassigns = [];
  constructor(private router: Router,
    public service: VsenseapiService,
    private notification: NotificationService,
    private excelservice: ExcelService,
    private datepipe: DatePipe,
    private _masterService: MasterService,
    private spinner: NgxSpinnerService
  ) { }

  getdevicestatus() {
    this.spinner.show();
    this.service.getdevicestatus().subscribe(data => {
      this.service.getalldeviceids().subscribe(x => {
        this.totalDevices=x.length;
      this.deviceStatus = data;
     console.log(this.deviceStatus);
      this.deviceStatus.forEach(element => {
        var date: Date = new Date(element.date);
        // this.lineChartLabels.push(date.getDate().toString());
      });
      var convertdevicestatus1=[];
      var convertdevicestatus2=[];
      this.deviceStatus.forEach(element => {
        convertdevicestatus1.push({
          x:new Date(element.x),
          y:element.y
        });
        var total=this.totalDevices;
        var count=element.y;
        convertdevicestatus2.push({
          x:new Date(element.x),
          y:total-count
        });
      });
      this.lineChartData.push({
        data: convertdevicestatus1,
        label: "ActiveDevices",
        borderColor: '#e46c53',
        backgroundColor: 'transparent',
        pointBorderColor: 'transparent',
        borderWidth: 3.5
      });
      this.lineChartData.push({
        data: convertdevicestatus2,
        label: "InactiveDevices",
        borderColor: '#3991dc',
        backgroundColor: 'transparent',
        pointBorderColor: 'transparent',
        borderWidth: 3.5
      });
      this.spinner.hide();
      //console.log(this.lineChartData);
    },(err)=>{
      this.notification.success("something went wrong");
      this.spinner.hide();
    });
    });
  }

  getalldeviceassigns() {
    this.spinner.show
    this.service.getalldeviceassigns().subscribe((data: any[]) => {
      this.deviceassigns = data;
      this.active_count = 0;
      this.inactive_count = 0;
      for (var i in this.deviceassigns) {
        if (this.deviceassigns[i].device.isEnabled == true) {
          this.active_count += 1;
        }
        else {
          this.inactive_count += 1;
        }
      }
      this.data_arr = [this.active_count, this.inactive_count];
      this.labels = ["Active", "Inactive"];
      this.chart = new Chart('canvas', {
        type: 'doughnut',
        data: {
          labels: this.labels,
          datasets: [
            {
              borderWidth: 0,
              data: this.data_arr,
              backgroundColor: [
                "#fb863a",
                "#40a8e2"
              ],
              fill: true
            }
          ]
        },
        options: {

          cutoutPercentage: 78,
          plugins: {

            labels: {

              fontColor: '#434343',
              fontSize: 8,
              fontWeight: 500,
              position: 'outside',
              textMargin: 6
            }
          },

          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: false
            }],
            yAxes: [{
              display: false
            }],
          }
        }
      });
    },(err)=>{
      this.notification.success("something went wrong");
      this.spinner.hide();
    })

  }
  deviceselect(selection: string) {
    if (selection == "1") {
      this.getactivedevices();
      this.isAll = false;
    }
    else if (selection == "2") {
      this.getinactivedevices();
      this.isAll = false;
    }
    else {
      this.service.getalldeviceassigns().subscribe((data: any[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.tablePaginator;
        this.isAll = true;
      });
    }
  }
  actionselect(action: string, equipment) {
    if (action == "1") {
      localStorage.setItem('assignment', JSON.stringify(equipment));
      //console.log(equipment);
      this.service.emitChange("Device Details");
      this.router.navigate(['/devicedetails']);
    }
    else if (action == "2") {
      if (equipment.device.isEnabled == true) {
        this.notification.update("Device already Enabled");
      }
      else {
        equipment.device.isEnabled = true;
        equipment.device.modifiedBy = this.currentUserName;
        //console.log(equipment.device);
        this.service.updatedevice(equipment.device).subscribe((data: any[]) => {
          // console.log(data);
          this.notification.update("Device Enabled");
          // this.device=this.empty;
          if (this.isAll) {
            this.dataSource = new MatTableDataSource(this.allDevices);
            this.dataSource.paginator = this.tablePaginator;
          }
          else {
            this.getinactivedevices();
          }
          this.getalldeviceassigns();
        })
      }
    }
    else {
      if (equipment.device.isEnabled == false) {
        this.notification.update("Device already Disabled");
      }
      else {
        equipment.device.modifiedBy = this.currentUserName;
        equipment.device.isEnabled = false;
        //console.log(equipment.device);
        this.service.updatedevice(equipment.device).subscribe((data: any[]) => {
          // console.log(data);
          this.notification.update("Device Disabled");
          // this.device=this.empty;
          if (this.isAll) {
            this.dataSource = new MatTableDataSource(this.allDevices);
            this.dataSource.paginator = this.tablePaginator;
          }
          else {
            this.getactivedevices();
          }

          this.getalldeviceassigns();
        })
      }
    }
  }

  getResentlyUpdated() {
    this.spinner.show();
    let allogs = [];
    this.service.getrecentlogs().subscribe((data: any[]) => {
      allogs = data;
      // console.log(data);
      for (var i in allogs) {
        allogs[i].timeDiff = this.getTimeDiff(allogs[i].device_log.dateTime);
        this.recentlyUpdated.push(allogs[i]);
      }
      //console.log(this.recentlyUpdated);
    },(err)=>{
      this.notification.success("something went wrong");
      this.spinner.hide();
    });
  }
  datapuller() {
    let allogs = [];
    this.service.getrecentlogs().subscribe((data: any[]) => {
      allogs = data;

      for (var i in allogs) {
        allogs[i].timeDiff = this.getTimeDiff(allogs[i].device_log.dateTime);;
        this.recentlyUpdated[i] = (allogs[i]);
      }
      //console.log(this.recentlyUpdated);
    })
  }
  ngOnInit(): void {
    // console.log(this.thisMonth);
    this.getdevicestatus();
    this.service.emitChange("Dashboard");
    this.getalldeviceassigns();
    this.getResentlyUpdated();
    this.getactivedevices();
    // this.getalldevices();

    this.subscription = interval(30000).subscribe((func => {
      this.datapuller();
    }));


    const retrievedObject = localStorage.getItem('authorizationData');
    if (retrievedObject) {
      this.authenticationDetails = JSON.parse(retrievedObject) as AuthenticationDetails;
      this.currentUserID = this.authenticationDetails.UserID;
      this.currentUserName = this.authenticationDetails.UserName;
      this.currentUserRole = this.authenticationDetails.UserRole;
    } else {
      this.router.navigate(['/login']);
    }
    this.CreateAppUsage();
  }

  CreateAppUsage(): void {
    const appUsage: AppUsage = new AppUsage();
    appUsage.UserID = this.currentUserID;
    appUsage.AppName = 'Home';
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
  getTimeDiff(date: string) {
    let updatedDate = new Date(date);
    let currentDate = new Date();
    let diffMs = (currentDate.getTime() - updatedDate.getTime()); // milliseconds
    let diffDays = Math.floor(diffMs / 86400000); // days
    let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    if (diffDays > 0) {
      if (diffDays == 1) {
        return diffDays + " day ago";
      }
      return diffDays + " days ago";
    }
    else if (diffHrs > 0) {
      if (diffHrs == 1 && diffMins == 1) {
        return diffHrs + " hour " + diffMins + "minute ago"
      }
      else if (diffHrs == 1) {
        return diffHrs + " hour ago"
      }
      return diffHrs + " hours ago"
    }
    else {
      if (diffMins < 1) {
        return " just now";
      }
      else if (diffMins == 1) {
        return diffMins + " minute ago";
      }
      return diffMins + " minutes ago";
    }
  }
  getactivedevices() {
    this.service.getallactivedevices().subscribe((data: any[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.tablePaginator;
    })
  }
  getinactivedevices() {
    this.service.getallinactivedevices().subscribe((data: any[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.tablePaginator;
    })
  }
  getalldevices() {
    this.service.getalldeviceassigns().subscribe((data: any[]) => {
      this.allDevices = data;
    })
  }
  deviceStatusvalue(value){
    if(value){
      return "Enabled";
    }
    else{
      return "Disabled";
    }
  }
  handle_devicedetails(equipmentid: string) {
    this.router.navigate(['/devicedetails']);
  }
  handlefilter() {
    this.dataSource.filter = this.key.trim().toLowerCase();
  }
  
  downloadToExcel() {
    var array = [];
    this.allDevices.forEach(x => {
      let device = {
        deviceID: x.deviceID,
        deviceName: x.device.name,
        equipmentID: x.equipmentID,
        equipmentName: x.equipment.text,
        locationID: x.locID,
        locationName: x.location.lcoationText,
        softwareVersion: x.device.softwareVersion,
        Vcc: x.device.vcc,
        Battery: x.device.battery,
        Healthy: x.device.healthy,
        PutToUseDate: this.datepipe.transform(x.device.puttoUse, 'dd-MM-yyyy')
      }
      array.push(device);
    });
    this.excelservice.exportAsExcelFile(array, "device_details");
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
