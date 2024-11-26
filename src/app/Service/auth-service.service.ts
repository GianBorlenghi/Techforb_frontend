import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../Model/User';
import { Login } from '../Model/Login';
import { CookieServic } from './cookie.servic';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private url = "http://localhost:8080/";
  private url = "https://repotechfb.onrender.com/"
  isLogued:boolean = false;
  constructor(private http:HttpClient,private cookieService:CookieServic) {

    }


   public logIn(user:Login):any{
      return this.http.post(this.url + "api/v1/auth/login",user);
   }

   public register(user:User){
    return this.http.post(this.url + 'api/v1/auth/register',user,{responseType : 'json',observe:'response'});
   }
   

   public resetPassword(username:any){
    return this.http.put(this.url + 'api/auth/forgotPassword/'+username,null,{responseType : 'json',observe:'response'});
   }

   public changePassword(id:any,changePasswordDto:any){
    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+ this.cookieService.getCookie("token")
    )
    return this.http.put(this.url +'api/auth/changePassword/'+id,changePasswordDto,{headers:header,responseType:'json',observe:'response'});
   }

   public logout():any{

    let header = new HttpHeaders().set(
      'authorization', 'Bearer '+this.cookieService.getCookie("token")
    );
    header.set('Content-Type' , 'application/json')

      return this.http.post(this.url + 'api/auth/logout','',{headers:header,responseType:'text'})
  }

}