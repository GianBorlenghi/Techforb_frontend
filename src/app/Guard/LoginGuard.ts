import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Service/auth-service.service';
import { CookieServic } from '../Service/cookie.servic';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private route:Router,private authService:AuthService,private cookieService: CookieServic){}

canActivate():boolean{
  if(this.cookieService.getCookie("token") === ""){
    this.route.navigate(['login']);
    return false;
  }else{
    return true;
  }
}


}