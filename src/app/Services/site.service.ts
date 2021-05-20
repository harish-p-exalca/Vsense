
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MSite } from 'src/app/Models/site'

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  baseAddress: string = 'http://localhost:5501';

  constructor(private httpClient: HttpClient) { }

  CreateMSite(emp: MSite): Observable<any> {
    return this.httpClient.post<any>(`${this.baseAddress}/api/VSense/CreateMSite`, emp, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }).pipe(
      catchError(this.errorHandler)
    );
  }
  UpdateMSite(emp: MSite): Observable<any> {
    return this.httpClient.post<any>(`${this.baseAddress}/api/VSense/CreateMSite`,emp, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }).pipe(
      catchError(this.errorHandler)
    );
  }
  GetMSites(): Observable<MSite | string> {
    return this.httpClient.get<MSite>(`${this.baseAddress}/api/VSense/GetMSites`)
      .pipe(catchError(this.errorHandler));
  }

  // DeleteMSite(ID :number): Observable<any> {
  //   return this.httpClient
  //     .post<any>(
  //       `${this.baseAddress}/api/VSense/DeleteMSite`, ID,{
  //         headers: new HttpHeaders({
  //           'Content-type': 'application/json'
  //         })
  //       })
  //     .pipe(catchError(this.errorHandler));
  // }
  DeleteMSite(ID:number):Observable<any>{
    return this.httpClient.delete<any>(`${this.baseAddress}/api/VSense/DeleteMSite?ID=${ID}`)
        .pipe(catchError(this.errorHandler));
}
  // Getvendor(Email1: string, Contact1: string): Observable<Vendor | string> {
  //   return this.httpClient.get<Vendor>(`${this.baseAddress}/api/Vendor/Getvendor?Email1=${Email1}&Contact1=${Contact1}`)
  //     .pipe(catchError(this.errorHandler));
  // }

  errorHandler(httpErrorResponse: HttpErrorResponse): Observable<string> {
    return throwError(httpErrorResponse.error || httpErrorResponse.message || 'Something went wrong');
  }


}
