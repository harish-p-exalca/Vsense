
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MSpace } from 'src/app/Models/site'
@Injectable({
  providedIn: 'root'
})
export class SpaceService {
  baseAddress: string = 'http://localhost:5501';
  constructor(private httpClient: HttpClient) { }

  CreateMSpace(emp: MSpace): Observable<any> {
    return this.httpClient.post<any>(`${this.baseAddress}/api/VSense/CreateMSpace`, emp, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    }).pipe(
      catchError(this.errorHandler)
    );
  }

  GetMSpaces(): Observable<MSpace | string> {
    return this.httpClient.get<MSpace>(`${this.baseAddress}/api/VSense/GetMSpaces`)
      .pipe(catchError(this.errorHandler));
  }

  DeleteMSpace(ID:number):Observable<any>{
    return this.httpClient.delete<any>(`${this.baseAddress}/api/VSense/DeleteMSpace?ID=${ID}`)
        .pipe(catchError(this.errorHandler));
}

UpdateMSpace(emp: MSpace): Observable<any> {
  return this.httpClient.post<any>(`${this.baseAddress}/api/VSense/CreateMSpace`,emp, {
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
