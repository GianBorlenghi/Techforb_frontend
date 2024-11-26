import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieServic } from './cookie.servic';

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  //private url = "http://localhost:8080/api/v1/sensor";
  private url = "https://repotechfb.onrender.com/api/v1/sensor";


  constructor(private http:HttpClient,private cookieService:CookieServic) { }

  getAllSensor():any{

    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+this.cookieService.getCookie("token")
    )
  

    return this.http.get(this.url + '/findAllSensors',{headers:header,responseType:'json'})
  }

  createSensorInPlant(sensorPlant:any){

    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+this.cookieService.getCookie("token")
    )
    return this.http.post(this.url + "Plant/create",sensorPlant,{headers:header,responseType:'text'})
  }

  updateSensor(sensor:any){
    
    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+this.cookieService.getCookie("token")
    )
    return this.http.post(this.url + "/update/"+sensor.id_sensor,sensor,{headers:header,responseType:'text'})
  }

  createSensor(sensor:any){
    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+this.cookieService.getCookie("token")
    )
    return this.http.post(this.url + "/create",sensor,{headers:header,responseType:'text'})
  }

  deleteSensor(id:any){
    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+this.cookieService.getCookie("token")
    )
    return this.http.delete(this.url + "/delete/"+id,{headers:header,responseType:'text'})
  }
}
