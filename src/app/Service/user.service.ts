import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieServic } from './cookie.servic';
import { User } from '../Model/User';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private url = "http://localhost:8080/api/";
  private url ="https://repotechfb.onrender.com/api/"
    constructor(private http:HttpClient,private cookieService:CookieServic) { }

    getUserById(id:any){
      let header = new HttpHeaders().set(
        'authorization', 'Bearer '+this.cookieService.getCookie("token")
      )
      return this.http.get(this.url + 'v1/auth/findById/' + id,{headers:header,responseType:'json',observe:'response'})
    }

 
    getUserOnline():any{
      let header = new HttpHeaders().set(
        'authorization', 'Bearer '+this.cookieService.getCookie("token")
      )
      return this.http.get(this.url + 'user/admin/viewConnectedUsers',{headers:header,responseType:'json',observe:'response'})
    }

    setOffline():any{
      let header = new HttpHeaders().set(
        'authorization', 'Bearer '+this.cookieService.getCookie("token")
      )
      console.log("Hola");
        return this.http.post(this.url + 'user/set_offline/'+localStorage.getItem('id_user'),{headers:header});
    }

    updateProfile(id:any,us:User){
      let header = new HttpHeaders().set(
        'authorization', 'Bearer '+this.cookieService.getCookie("token")
      )

      return this.http.post(this.url + "v1/auth/update/"+id,us,{headers:header,responseType:'text',observe:'response'})
    }
}
