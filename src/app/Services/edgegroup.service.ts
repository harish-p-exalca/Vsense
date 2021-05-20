import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MEdgeGroup, MEdgeGroupView } from 'src/app/Models/site'

@Injectable({
  providedIn: 'root'
})
export class EdgegroupService {
  baseAddress: string = 'http://localhost:5501';

  constructor(private httpClient: HttpClient) { }
  CreateMEdgeGroup(emp: MEdgeGroupView): Observable<any> {
    return this.httpClient.post<any>(`${this.baseAddress}/api/VSense/CreateMEdgeGroup`, emp, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }).pipe(
      catchError(this.errorHandler)
    );
  }
  GetMEdgeGroups(): Observable<MEdgeGroupView | string> {
    return this.httpClient.get<MEdgeGroupView>(`${this.baseAddress}/api/VSense/GetMEdgeGroups`)
      .pipe(catchError(this.errorHandler));
  }
  // GetMEdgeGroups(): Observable<any> {
  //   return this.httpClient.get<any>(`${this.baseAddress}/api/VSense/GetMEdgeGroups`)
  //     .pipe(catchError(this.errorHandler));
  // }
  DeleteMEdgeGroup(ID:number):Observable<any>{
    return this.httpClient.delete<any>(`${this.baseAddress}/api/VSense/DeleteMEdgeGroup?ID=${ID}`)
        .pipe(catchError(this.errorHandler));
}
UpdateMEdgeGroup(emp: MEdgeGroupView): Observable<any> {
  return this.httpClient.post<any>(`${this.baseAddress}/api/VSense/CreateMEdgeGroup`,emp, {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  }).pipe(
    catchError(this.errorHandler)
  );
}

  errorHandler(httpErrorResponse: HttpErrorResponse): Observable<string> {
    return throwError(httpErrorResponse.error || httpErrorResponse.message || 'Something went wrong');
  }

}
