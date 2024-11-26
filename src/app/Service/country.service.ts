import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieServic } from './cookie.servic';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
 //private url = "https://repotechfb.onrender.com/api/v1/country";
 private url = "https://repotechfb.onrender.com/api/v1/country";

  constructor(private http:HttpClient,private cookieService:CookieServic) { }

  getAllCountries():any{

    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+this.cookieService.getCookie("token")
    )
  

    return this.http.get(this.url + '/getAllCountries',{headers:header,responseType:'json'})
  }


}
