import { Component, OnInit } from '@angular/core';
import { WaterConsumption } from 'src/app/Models/cf';
import { VsenseapiService } from 'src/app/Services/vsenseapi.service';

@Component({
  selector: 'app-water-consumption',
  templateUrl: './water-consumption.component.html',
  styleUrls: ['./water-consumption.component.scss']
})
export class WaterConsumptionComponent implements OnInit {

  searchText:string;
  AllDevices:WaterConsumption[]=[];
  SelectedDevice:string;
  DataPuller;
  CurrentDeviceData:WaterConsumption=new WaterConsumption();
  constructor(private service:VsenseapiService) { }

  ngOnInit(): void {
    this.service.emitChange("Water Consumption");
    this.CurrentDeviceData.flow="0";
    this.CurrentDeviceData.qty="0";
    this.service.GetAllWaterDevices().subscribe(data=>{
      this.AllDevices=data;
      this.SelectedDevice=this.AllDevices[0].deviceId;
      this.GetDeviceData();
      this.DataPuller=setInterval(x=>{
        this.GetDeviceData();
      },5000);
    });
  }

  LoadSelectedDevice(deviceID:string){
    this.SelectedDevice=deviceID;
    this.GetDeviceData();
  }

  GetDeviceData(){
    this.service.GetWaterConsumption(this.SelectedDevice).subscribe(data=>{
      this.CurrentDeviceData=<WaterConsumption>data;
    });
  }

  ngOnDestroy() {
    if (this.DataPuller) {
      clearInterval(this.DataPuller);
    }
  }

}
