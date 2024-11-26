import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plant } from '../Model/Plant';
import { CookieServic } from './cookie.servic';

@Injectable({
  providedIn: 'root'
})


export class PlantService {
  private url = "https://repotechfb.onrender.com/api/v1/plant";
  //private url =   "http://localhost:8080/api/v1/plant"
  constructor(private http:HttpClient,private cookieService:CookieServic) { }



  getAllPlants():any{

    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+this.cookieService.getCookie("token")
    )
  

    return this.http.get(this.url + '/findAllPlants',{headers:header,responseType:'json'})
  }

  createPlant(plant:Plant):any{
    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+this.cookieService.getCookie("token")
    )
    console.log(plant)
    return this.http.post(this.url + "/create",plant,{headers:header,observe:'response',responseType:'json'})
  }

  editPlant(id:any,plant_name:any):any{
    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+this.cookieService.getCookie("token")
    )

    return this.http.post(this.url + "/update/"+id,plant_name,{headers:header,observe:'response',responseType:'text'})
  }

  deletePlant(id:any){
    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+this.cookieService.getCookie("token")
    )

    return this.http.delete(this.url+ "/delete/"+id,{headers:header,observe:'response',responseType:'json'});
  }
}
