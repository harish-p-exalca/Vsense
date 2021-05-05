import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http:HttpClient) { }

  public log(user:string,page:string,message){
    this.http.post("http://localhost:5000/api/logs",{
      "user":user,
      "page":page,
      "error":message
    },this.httpOptions).subscribe();
  }
}
