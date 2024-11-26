import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieServic } from './cookie.servic';
import { Alert } from '../Model/Alert';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
private url = "https://repotechfb.onrender.com/api/v1/alert"
//private url = "http://localhost:8080/api/v1/alert"
  constructor(private http:HttpClient,private cookieService:CookieServic) { }

  updateAlert(id:any,alert:Alert){
    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+ this.cookieService.getCookie("token")
    )
    return this.http.post(this.url + "/update/" + id,alert, {
      headers: header,
      responseType: 'text',
      observe: 'response'
  });
     }

     getAllAlert():any{
      let header = new HttpHeaders().set(
        'authorization', 'Bearer '+ this.cookieService.getCookie("token")
      )
      return this.http.get(this.url + "/getAllAlert",{headers:header,responseType:'json',observe:'response'})
     }
  }

