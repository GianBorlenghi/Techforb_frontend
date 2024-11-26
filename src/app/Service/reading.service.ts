import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieServic } from './cookie.servic';

@Injectable({
  providedIn: 'root'
})
export class ReadingService {
private url = "https://repotechfb.onrender.com/api/v1/reading";
//private url = "http://localhost:8080/api/v1/reading"
  constructor(private http:HttpClient,private cookieService:CookieServic) { }
  getAllReads():any{

    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+this.cookieService.getCookie("token")
    )
  
  
    return this.http.get(this.url + '/getAllReadings',{headers:header,responseType:'json'})
  }

  generateRandomRead():any{

    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+this.cookieService.getCookie("token")
    )
  
  
    return this.http.post(this.url + '/generateRandomRead',{},{headers:header,responseType:'json'})
  }

}




