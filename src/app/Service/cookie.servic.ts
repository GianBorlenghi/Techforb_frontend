import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';  // Asegúrate de que esta importación esté correcta

@Injectable({
  providedIn: 'root'
})
export class CookieServic {
  constructor(private cookieService: CookieService) { }

 setCookie(name: string, value: string): void {
  const date = new Date();
  this.cookieService.set(name, value);
}

getCookie(name: string): string {
  return this.cookieService.get(name);
}

deleteCookie(name: string): void {
  this.cookieService.delete(name);
}
setArrayInCookie(name: string, array: any[]): void {
  const arrayString = JSON.stringify(array);  
  this.cookieService.set(name, arrayString);  
}

getArrayFromCookie(name: string): any[] {
  const arrayString = this.cookieService.get(name); 
  if (arrayString) {
    return JSON.parse(arrayString);  
  }
  return [];
}


}