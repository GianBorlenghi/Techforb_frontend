import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

  constructor(private route:Router,private authService:AuthService){}

canActivate():boolean{
        if(localStorage.getItem('token')!== null){
          this.route.navigate(['dashboard']);
          return false;
        }else{
          return true
        }
      }
        


}