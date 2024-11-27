import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieServic } from './Service/cookie.servic';
import { AuthService } from './Service/auth-service.service';
import { UserService } from './Service/user.service';
import { User } from './Model/User';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  userr: any;

  title = 'entrega_techf_frontend';
  constructor(private titleService:Title,private userService: UserService, private router: Router, private cookieService: CookieServic, private authService: AuthService) { }
  ngOnInit(): void {
    
  
    $(document).ready(function () {
      // Alternar la barra lateral al hacer clic en el botón
      $('#menu-toggle').click(function () {
        $('.nav-container').toggleClass('active');
      });

      // Ocultar el botón en pantallas pequeñas
      function checkScreenSize() {
        const windowWidth = window.innerWidth; // Usar window.innerWidth directamente
        if (windowWidth < 768) {
          $('#menu-toggle').show(); // Oculta el botón en pantallas pequeñas
        } else {
          $('#menu-toggle').hide(); // Muestra el botón en pantallas grandes
        }
      }

      // Llama a la función al cargar la página y cuando se cambia el tamaño de la ventana
      checkScreenSize();
      $(window).resize(checkScreenSize); // Llama cada vez que la ventana cambie de tamaño
    });


  }
  isLoginRoute(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }

  logout() {
    // Borra cookies relacionadas con la autenticación
    this.authService.logout();
    this.cookieService.deleteCookie('token'); // Token de autenticación
    this.cookieService.deleteCookie('id_user'); // ID del usuario

    this.router.navigate(['/login']);
  }
  toggleMenu() {
    const navContainer = document.querySelector('.nav-container');
    navContainer?.classList.toggle('active');
  }
}

