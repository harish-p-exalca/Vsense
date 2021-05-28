import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexStroke, ApexTooltip, ApexDataLabels, ChartComponent, ApexFill, ApexGrid } from 'ng-apexcharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { VsenseapiService } from 'src/app/Services/vsenseapi.service';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  grid:ApexGrid;
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
  DeviceDataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) DevicePaginator: MatPaginator;
  @ViewChild(MatSort) DeviceSort: MatSort;
  DevicedisplayedColumns: string[] = ['equipmentname', 'location', 'device', 'status', 'action'];
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
    this.spinner.show();
    this.getactivedevices();
    this.getinactivedevices();
    this.getalldevices();
    this.getdevicestatus();
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

  getactivedevices() {
    this.service.getallactivedevices().subscribe((data: any[]) => {
      this.ActiveDevices = data;
      this.LoadTableSource(this.ActiveDevices);
      this.spinner.hide();
    },
      err => {
        console.log(err)
        this.spinner.hide();
      });
  }
  getinactivedevices() {
    this.service.getallinactivedevices().subscribe((data: any[]) => {
      this.InactiveDevices = data;
    });
  }
  getalldevices() {
    this.service.getalldeviceassigns().subscribe((data: any[]) => {
      this.AllDevices = data;
    });
  }
  deviceStatusvalue(value) {
    if (value) {
      return "Enabled";
    }
    else {
      return "Disabled";
    }
  }
  ViewDetails(Data) {
    localStorage.setItem('assignment', JSON.stringify(Data));
    this.service.emitChange("Device Details");
    this.router.navigate(['/devicedetails']);
  }
  LoadTableSource(DataArray: any[]) {
    this.DeviceDataSource = new MatTableDataSource(DataArray);
    this.DeviceDataSource.paginator = this.DevicePaginator;
    this.DeviceDataSource.sort = this.DeviceSort;
  }
  getdevicestatus() {
    this.spinner.show();
    this.service.getdevicestatus().subscribe(data => {
      const deviceStatus = data;
      this.chartOptions.series=[{
        name:"Active devices",
        data:deviceStatus
      }]
    });
  }
  applyFilter() {
    this.DeviceDataSource.filter = this.SearchKey.trim().toLowerCase();
  }
}
