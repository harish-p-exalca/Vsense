import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexStroke, ApexTooltip, ApexDataLabels, ChartComponent, ApexFill, ApexGrid, ApexMarkers } from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { VsenseapiService } from 'src/app/Services/vsenseapi.service';
import { MonitorTableView } from 'src/app/Models/monitor';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  grid:ApexGrid;
  markers:ApexMarkers
};
@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {

  @ViewChild("splinechart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  selectedDevices: string = "Active";
  AllDevices: any[] = [];
  ActiveDevices: any[] = [];
  InactiveDevices: any[] = [];
  DeviceDataSource: MatTableDataSource<any>=new MatTableDataSource([]);
  @ViewChild(MatPaginator) DevicePaginator: MatPaginator;
  @ViewChild(MatSort) DeviceSort: MatSort;
  DevicedisplayedColumns: string[] = ['Site', 'Space', 'Asset', 'Edge','LastFeed','Status','Action'];
  SearchKey:string;

  constructor(
    private service: VsenseapiService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {
    this.chartOptions = {
      series: [
        {
          name: "Active devices",
          data: []
        }
      ],
      chart: {
        type: "area",
        height: "146px",
        width: "100%",
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      markers:{
        size:[5],
        colors:["#7d95ff"],
        hover: {
          size: undefined,
          sizeOffset: 3
        }
      },
      stroke: {
        curve: "smooth",
        colors: ["#7d95ff"],
        width: 2
      },
      fill: {
        colors: ["#7d95ff"],
        type: "gradient",
        gradient: {
          shadeIntensity: 0,
          opacityFrom: 0.6,
          opacityTo: 0.4,
          stops: [0, 50, 100]
        }
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      },
      grid:{
        show:false
      }
    };
  }

  ngOnInit(): void {
    this.GetMonitorData();
  }

  ChangeDevice(status: string) {
    this.selectedDevices = status;
    if (status == "Active") {
      this.LoadTableSource(this.ActiveDevices);
    }
    else if (status == "Inactive") {
      this.LoadTableSource(this.InactiveDevices);
    }
    else {
      this.LoadTableSource(this.AllDevices);
    }
  }

  GetMonitorData() {
    this.spinner.show();
    this.service.GetMonitorTable().subscribe((data: any[]) => {
      this.AllDevices=<MonitorTableView[]>data;
      this.ActiveDevices = this.AllDevices.filter(x=>x.Status==true);
      this.InactiveDevices=this.AllDevices.filter(x=>x.Status==false);
      if(this.selectedDevices=="Active"){
        this.LoadTableSource(this.ActiveDevices);
      }
      else if (this.selectedDevices == "Inactive") {
        this.LoadTableSource(this.InactiveDevices);
      }
      else {
        this.LoadTableSource(this.AllDevices);
      }
      this.service.GetEdgeStatusChartData().subscribe(data => {
        console.log(data);
        const deviceStatus = data;
        this.chartOptions.series=[{
          name:"Active devices",
          data:deviceStatus
        }];
        this.spinner.hide();
      },
      err=>{
        this.spinner.hide();
        console.log(err);
      });
      this.spinner.hide();
    },
      err => {
        console.log(err)
        this.spinner.hide();
      });
  }
  ViewDetails(Data) {
    localStorage.setItem('assignment', JSON.stringify(Data));
    this.router.navigate(['/controlcenter']);
  }
  LoadTableSource(DataArray: any[]) {
    this.DeviceDataSource = new MatTableDataSource(DataArray);
    this.DeviceDataSource.paginator = this.DevicePaginator;
    this.DeviceDataSource.sort = this.DeviceSort;
  }
  applyFilter() {
    this.DeviceDataSource.filter = this.SearchKey.trim().toLowerCase();
  }
  ToggleDeviceStatus(EdgeID:number){
    this.service.ToggleDeviceStatus(EdgeID).subscribe(res=>{
      this.GetMonitorData();
    },
    err=>{
      console.log(err);
    });
  }
}
