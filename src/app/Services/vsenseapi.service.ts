import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from "src/environments/environment";
import { AssetView, MEdge, MEdgeGroupView, MSite, MSpace } from '../Models/site';

@Injectable({
  providedIn: 'root'
})
export class VsenseapiService {
  private server_address = environment.apiUrl;
  //private server_address = "http://localhost:5501/vsenseapi";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  // Observable string sources
  private emitChangeSource = new Subject<any>();
  // Observable string streams 
  changeEmitted$ = this.emitChangeSource.asObservable();
  // Service message commands
  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }

  public getIPAddress() {
    return this.httpClient.get("http://api.ipify.org/?format=json");
  }
  getdevicelog(id: string, pramID: string): Observable<any[]> {
    return this.httpClient.get<any[]>(this.server_address + "/DeviceLog/getlog?deviceid=" + id + "&pramid=" + pramID)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getalllogs(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.server_address + "/devicelog/getalllogs")
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getrecentlogs(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.server_address + "/devicelog/getrecentlogs")
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getalldevices(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.server_address + "/master/getalldevices")
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getallactivedevices(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.server_address + "/master/getallactivedevices")
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getallinactivedevices(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.server_address + "/master/getallinactivedevices")
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getalldeviceparams(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.server_address + "/master/getalldeviceparams")
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getallequipments(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.server_address + "/master/getallequipments")
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getalllocs(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.server_address + "/master/getalllocs")
      .pipe(
        catchError(this.errorHandler)
      )
  }

  createdevice(data: any): Observable<any[]> {
    return this.httpClient.post<any>(this.server_address + '/master/device', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  createdeviceparam(data: any): Observable<any[]> {
    return this.httpClient.post<any>(this.server_address + '/master/deviceparam', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  createequipment(data: any): Observable<any[]> {
    return this.httpClient.post<any>(this.server_address + '/master/equipment', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  createloc(data: any): Observable<any[]> {
    return this.httpClient.post<any>(this.server_address + '/master/location', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updatedevice(data: any): Observable<any[]> {
    return this.httpClient.post<any>(this.server_address + '/master/deviceupdate', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updatedeviceparam(data: any): Observable<any[]> {
    return this.httpClient.post<any>(this.server_address + '/master/deviceparamupdate', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateequipment(data: any): Observable<any[]> {
    return this.httpClient.post<any>(this.server_address + '/master/equipmentupdate', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateloc(data: any): Observable<any[]> {
    return this.httpClient.post<any>(this.server_address + '/master/locationupdate', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  deletedevice(id: any): Observable<any[]> {
    return this.httpClient.delete<any[]>(this.server_address + '/master/deletedevice?id=' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  deletedeviceparam(deviceid: string, paramid: string): Observable<any[]> {
    return this.httpClient.delete<any[]>(this.server_address + '/master/deletedeviceparam?deviceid=' + deviceid + '&paramid=' + paramid)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  deleteequipment(id: any): Observable<any[]> {
    return this.httpClient.delete<any[]>(this.server_address + '/master/deleteequipment?id=' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  deletelocation(id: any): Observable<any[]> {
    return this.httpClient.delete<any[]>(this.server_address + '/master/deletelocation?id=' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  deletetrkdo(id: any): Observable<any[]> {
    return this.httpClient.delete<any[]>(this.server_address + '/master/deletetrkdo?id=' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getdevicesbyequipment(id: any): Observable<any[]> {
    return this.httpClient.get<any[]>(this.server_address + '/assignment/getdevices?equipmentid=' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getalldeviceids(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.server_address + '/master/getalldeviceid')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  //not created..
  //assignment..Completed
  getalldeviceassigns(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.server_address + "/assignment/getalldeviceassigns")
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getalldeviceassignparams(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.server_address + "/assignment/getalldeviceassignparams")
      .pipe(
        catchError(this.errorHandler)
      )
  }
  createdeviceassign(data: any): Observable<any[]> {
    return this.httpClient.post<any>(this.server_address + '/assignment/deviceassign', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  createdeviceassignparam(data: any): Observable<any[]> {
    return this.httpClient.post<any>(this.server_address + '/assignment/deviceassignparam', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updatedeviceassign(data: any): Observable<any[]> {
    return this.httpClient.post<any>(this.server_address + '/assignment/updatedeviceassign', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updatedeviceassignparam(data: any): Observable<any[]> {
    return this.httpClient.post<any>(this.server_address + '/assignment/updatedeviceassignparam', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  deletedeviceassign(id: any): Observable<any[]> {
    return this.httpClient.delete<any[]>(this.server_address + '/assignment/deletedeviceassign?id=' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  deletedeviceassignparam(id: any, assignmentid: any): Observable<any[]> {
    return this.httpClient.delete<any[]>(this.server_address + '/assignment/deletedeviceassignparam?pramid=' + id + '&assignmentid=' + assignmentid)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  //master..completed
  getallequipmentids(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.server_address + '/master/getallequipmentid')
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getalllocationids(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.server_address + '/master/getalllocationid')
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getassingidbydeviceid(id: any): Observable<any[]> {
    return this.httpClient.get<any[]>(this.server_address + '/assignment/getassingidbydeviceid?assignmentid=' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getdevicebyid(id: any): Observable<any[]> {
    return this.httpClient.get<any[]>(this.server_address + '/master/getdevice?deviceid=' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getdeviceassignparam(assignmentid, pramid): Observable<any[]> {
    return this.httpClient.get<any[]>(this.server_address + '/assignment/getdeviceassignparam?assignmentid=' + assignmentid + '&pramid=' + pramid)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getparamgroup(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.server_address + '/master/getparamgroup')
      .pipe(
        catchError(this.errorHandler)
      )
  }
  createparamgroup(data: any): Observable<any[]> {
    return this.httpClient.post<any>(this.server_address + '/master/paramgroup', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  updateparamgroup(data: any): Observable<any[]> {
    return this.httpClient.post<any>(this.server_address + '/master/updateparamgroup', JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getdevicestatus(): Observable<any> {
    return this.httpClient.get(this.server_address + "/devicelog/devicestatus")
      .pipe(
        catchError(this.errorHandler)
      )
  }
  enabledeviceparam(deviceid: string, paramid: string): Observable<any> {
    return this.httpClient.get(this.server_address + "/master/enabledeviceparam?deviceid=" + deviceid + "&paramid=" + paramid)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  disabledeviceparam(deviceid: string, paramid: string): Observable<any> {
    return this.httpClient.get(this.server_address + "/master/disabledeviceparam?deviceid=" + deviceid + "&paramid=" + paramid)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getallexceptions(): Observable<any> {
    return this.httpClient.get(this.server_address + "/devicelog/getexceptions")
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getexceptioncount(deviceid: string, pramid: string): Observable<any> {
    return this.httpClient.get(this.server_address + "/devicelog/getexceptioncount?deviceid=" + deviceid + "&pramid=" + pramid)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  GetAllWaterDevices(): Observable<any> {
    return this.httpClient.get(this.server_address + "/CarbonFootprint/GetAllWaterDevices")
      .pipe(
        catchError(this.errorHandler)
      )
  }
  GetAllCurrentDevices(): Observable<any> {
    return this.httpClient.get(this.server_address + "/CarbonFootprint/GetAllCurrentDevices")
      .pipe(
        catchError(this.errorHandler)
      )
  }
  GetWaterConsumption(deviceid: string): Observable<any> {
    return this.httpClient.get(this.server_address + "/CarbonFootprint/GetWaterConsumption?deviceid=" + deviceid)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  GetCurrentConsumption(deviceid: string): Observable<any> {
    return this.httpClient.get(this.server_address + "/CarbonFootprint/GetCurrentConsumption?deviceid=" + deviceid)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  GetEnergyConsumption(deviceid: string): Observable<any> {
    return this.httpClient.get(this.server_address + "/CarbonFootprint/GetEnergyConsumption?deviceid=" + deviceid)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  //VSense V2
  //Site
  SaveMSite(emp: MSite): Observable<any> {
    return this.httpClient.post<any>(`${this.server_address}/api/VSense/CreateMSite`, emp, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  GetMSites(): Observable<MSite[] | string> {
    return this.httpClient.get<MSite[]>(`${this.server_address}/api/VSense/GetMSites`)
      .pipe(catchError(this.errorHandler));
  }
  DeleteMSite(ID: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.server_address}/api/VSense/DeleteMSite?ID=${ID}`)
      .pipe(catchError(this.errorHandler));
  }
  //Space
  GetMSpaces(): Observable<MSpace[] | string> {
    return this.httpClient.get<MSpace[]>(`${this.server_address}/api/VSense/GetMSpaces`)
      .pipe(catchError(this.errorHandler));
  }

  DeleteMSpace(ID: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.server_address}/api/VSense/DeleteMSpace?ID=${ID}`)
      .pipe(catchError(this.errorHandler));
  }

  SaveMSpace(emp: MSpace): Observable<any> {
    return this.httpClient.post<any>(`${this.server_address}/api/VSense/CreateMSpace`, emp, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  //Edge
  GetMEdges(): Observable<MEdge[] | string> {
    return this.httpClient.get<MEdge[]>(`${this.server_address}/api/VSense/GetMEdges`)
      .pipe(catchError(this.errorHandler));
  }
  SaveMEdge(emp: MEdge): Observable<any> {
    return this.httpClient.post<any>(`${this.server_address}/api/VSense/CreateMEdge`, emp, this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  DeleteMEdge(ID: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.server_address}/api/VSense/DeleteMEdge?ID=${ID}`)
      .pipe(catchError(this.errorHandler));
  }
  GetOpenMEdges(): Observable<MEdge[] | string> {
    return this.httpClient.get<MEdge[]>(`${this.server_address}/api/VSense/GetOpenMEdges`)
      .pipe(catchError(this.errorHandler));
  }
  //Group
  GetMEdgeGroups(): Observable<MEdgeGroupView[] | string> {
    return this.httpClient.get<MEdgeGroupView[]>(`${this.server_address}/api/VSense/GetMEdgeGroups`)
      .pipe(catchError(this.errorHandler));
  }

  DeleteMEdgeGroup(ID: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.server_address}/api/VSense/DeleteMEdgeGroup?ID=${ID}`)
      .pipe(catchError(this.errorHandler));
  }
  SaveMEdgeGroup(emp: MEdgeGroupView): Observable<any> {
    return this.httpClient.post<any>(`${this.server_address}/api/VSense/CreateMEdgeGroup`, emp,this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  //Asset
  GetMAssets(): Observable<AssetView[] | string> {
    return this.httpClient.get<AssetView[]>(`${this.server_address}/api/VSense/GetMAssets`)
      .pipe(catchError(this.errorHandler));
  }

  DeleteMAsset(ID: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.server_address}/api/VSense/DeleteMAsset?ID=${ID}`)
      .pipe(catchError(this.errorHandler));
  }
  SaveMAsset(emp: AssetView): Observable<any> {
    return this.httpClient.post<any>(`${this.server_address}/api/VSense/CreateMAsset`, emp,this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: HttpErrorResponse): Observable<any[]> {
    return throwError(error.error instanceof Object ? error.error.Message ? error.error.Message : error.error : error.error || error.message || 'Server Error');
  }
}
