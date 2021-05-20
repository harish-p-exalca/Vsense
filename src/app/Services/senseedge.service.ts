
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MEdge } from 'src/app/Models/site'

@Injectable({
  providedIn: 'root'
})
export class SenseedgeService {
  baseAddress: string = 'http://localhost:5501';

  constructor(private httpClient: HttpClient) { }
  CreateMEdge(emp: MEdge): Observable<any> {
    return this.httpClient.post<any>(`${this.baseAddress}/api/VSense/CreateMEdge`, emp, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }).pipe(
      catchError(this.errorHandler)
    );
  }
  GetMEdges(): Observable<MEdge | string> {
    return this.httpClient.get<MEdge>(`${this.baseAddress}/api/VSense/GetMEdges`)
      .pipe(catchError(this.errorHandler));
  }
  UpdateMEdges(emp: MEdge): Observable<any> {
    return this.httpClient.post<any>(`${this.baseAddress}/api/VSense/CreateMEdge`,emp, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }).pipe(
      catchError(this.errorHandler)
    );
  }
  DeleteMEdge(ID:number):Observable<any>{
    return this.httpClient.delete<any>(`${this.baseAddress}/api/VSense/DeleteMEdge?ID=${ID}`)
        .pipe(catchError(this.errorHandler));
}



  errorHandler(httpErrorResponse: HttpErrorResponse): Observable<string> {
    return throwError(httpErrorResponse.error || httpErrorResponse.message || 'Something went wrong');
  }

}
