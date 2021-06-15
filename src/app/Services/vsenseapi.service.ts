import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from "src/environments/environment";
import { AssetView, MEdge, MEdgeGroupView, MSite, MSpace, Rule } from '../Models/site';

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

  //CF
  GetAllWaterDevices(): Observable<any> {
    return this.httpClient.get(this.server_address + "/api/CarbonFootprint/GetAllWaterDevices")
      .pipe(
        catchError(this.errorHandler)
      )
  }
  GetAllCurrentDevices(): Observable<any> {
    return this.httpClient.get(this.server_address + "/api/CarbonFootprint/GetAllCurrentDevices")
      .pipe(
        catchError(this.errorHandler)
      )
  }
  GetWaterConsumption(deviceid: string): Observable<any> {
    return this.httpClient.get(this.server_address + "/api/CarbonFootprint/GetWaterConsumption?deviceid=" + deviceid)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  GetCurrentConsumption(deviceid: string): Observable<any> {
    return this.httpClient.get(this.server_address + "/api/CarbonFootprint/GetCurrentConsumption?deviceid=" + deviceid)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  GetEnergyConsumption(deviceid: string): Observable<any> {
    return this.httpClient.get(this.server_address + "/api/CarbonFootprint/GetEnergyConsumption?deviceid=" + deviceid)
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
  //Rule
  GetRules(): Observable<Rule[] | string> {
    return this.httpClient.get<Rule[]>(`${this.server_address}/api/VSense/GetRules`)
      .pipe(catchError(this.errorHandler));
  }

  DeleteRule(ID: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.server_address}/api/VSense/DeleteRule?ID=${ID}`)
      .pipe(catchError(this.errorHandler));
  }
  SaveRule(emp: Rule): Observable<any> {
    return this.httpClient.post<any>(`${this.server_address}/api/VSense/CreateRule`, emp,this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  //Monitor
  GetMonitorTable(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.server_address}/api/VSense/GetMonitorTable`)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  ToggleDeviceStatus(EdgeID:number): Observable<any> {
    return this.httpClient.get<any>(`${this.server_address}/api/VSense/ToggleDeviceStatus?EdgeID=${EdgeID}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  GetEdgeStatusChartData(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.server_address}/api/VSense/GetEdgeStatusChartData`)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  //Control center
  GetMEdge(EdgeID:number): Observable<any> {
    return this.httpClient.get<any>(`${this.server_address}/api/VSense/GetMEdge?EdgeID=${EdgeID}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  GetLastLogOfParams(EdgeID:number): Observable<any> {
    return this.httpClient.get<any>(`${this.server_address}/api/VSense/GetLastLogOfParams?EdgeID=${EdgeID}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  GetControlCenterFeed(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.server_address}/api/VSense/GetControlCenterFeed`)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  //Live Feeds
  GetLivFeeds(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.server_address}/api/VSense/GetLivFeeds`)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  //Exceptions
  GetExceptions(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.server_address}/api/VSense/GetExceptions`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: HttpErrorResponse): Observable<any[]> {
    return throwError(error.error instanceof Object ? error.error.Message ? error.error.Message : error.error : error.error || error.message || 'Server Error');
  }
}
