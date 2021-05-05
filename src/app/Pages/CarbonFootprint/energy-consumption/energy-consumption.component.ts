import { Component, OnInit } from '@angular/core';
import { VsenseapiService } from 'src/app/Services/vsenseapi.service';
import {CurrentConsumption} from 'src/app/Models/cf';

@Component({
  selector: 'app-energy-consumption',
  templateUrl: './energy-consumption.component.html',
  styleUrls: ['./energy-consumption.component.scss']
})
export class EnergyConsumptionComponent implements OnInit {

  searchText:string;
  AllDevices:CurrentConsumption[]=[];
  SelectedDevice:string;
  DataPuller;
  CurrentDeviceData:CurrentConsumption=new CurrentConsumption();
  Energy:number=0;
  constructor(private service:VsenseapiService) { }

  ngOnInit(): void {
    this.service.emitChange("Energy Consumption");
    this.CurrentDeviceData.watt="0";
    this.CurrentDeviceData.current="0";
    this.service.GetAllCurrentDevices().subscribe(data=>{
      this.AllDevices=data;
      this.SelectedDevice=this.AllDevices[0].deviceId;
      this.GetDeviceData();
      this.GetEnergy();
      // this.DataPuller=setInterval(x=>{
      //   this.GetDeviceData();
      //   this.GetEnergy();
      // },5000);
    });
  }

  LoadSelectedDevice(deviceID:string){
    this.SelectedDevice=deviceID;
    this.GetDeviceData();
    this.GetEnergy();
  }

  GetEnergy(){
    this.service.GetEnergyConsumption(this.SelectedDevice).subscribe(data=>{
      this.Energy=data;
    });
  }
  GetDeviceData(){
    this.service.GetCurrentConsumption(this.SelectedDevice).subscribe(data=>{
      this.CurrentDeviceData=<CurrentConsumption>data;
    });
  }

  ngOnDestroy() {
    if (this.DataPuller) {
      clearInterval(this.DataPuller);
    }
  }

}
