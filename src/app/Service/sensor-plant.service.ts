import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieServic } from './cookie.servic';
import { SensorDTO } from '../Model/SensorDTO';
import { SensorPlant } from '../Model/SensorPlant';

@Injectable({
  providedIn: 'root'
})
export class SensorPlantService {
 private url = "https://repotechfb.onrender.com/api/v1/sensorPlant";
 //private url = "http://localhost:8080/api/v1/sensorPlant";


  constructor(private http:HttpClient,private cookieService:CookieServic) { }


  getAllSensorPlant(){
    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+this.cookieService.getCookie("token")
    )

    return this.http.get(this.url+"/getAll",{headers:header,responseType:'json'});
  }

  enableDisableSensor(s:any){
    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+this.cookieService.getCookie("token")
    )
    return this.http.post(this.url+"/update/"+s.id,s.status,{headers:header,responseType:'json'});

  }

  getAlertBySensor():any{
    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+this.cookieService.getCookie("token")
    )

    return this.http.get(this.url + "/getTypeReads",{headers:header,responseType:'json'})
  }
}
