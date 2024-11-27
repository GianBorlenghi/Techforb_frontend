import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieServic } from './Service/cookie.servic';
import { AuthService } from './Service/auth-service.service';
import { UserService } from './Service/user.service';
import { User } from './Model/User';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  userr: any;
  username:String = '';
  private usernameSubject = new BehaviorSubject<string>('');
  public currentUsername$ = this.usernameSubject.asObservable();
  title = 'entrega_techf_frontend';
  constructor(private titleService:Title,private userService: UserService, private router: Router, private cookieService: CookieServic, private authService: AuthService) { }
  ngOnInit(): void {

    $(document).ready(function() {
      $('.nav-container li').on('click', function() {
        var tooltip = $(this).find('.tooltip');
        
        if (tooltip.is(':visible')) {
          tooltip.fadeOut();
        } else {
          tooltip.fadeIn();
          setTimeout(function() {
            tooltip.fadeOut();
          }, 2000);
        }
      });
    });

    /*const userId = this.cookieService.getCookie('id_user');

    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (nombre: any) => {
          this.username = nombre.body.username;
        }
      );
    }*/

    
  
    $(document).ready(function () {
      $('#menu-toggle').click(function () {
        $('.nav-container').toggleClass('active');
      });

      function checkScreenSize() {
        const windowWidth = window.innerWidth; 
        if (windowWidth < 768) {
          $('#menu-toggle').show();
        } else {
          $('#menu-toggle').hide(); 
        }
      }

      checkScreenSize();
      $(window).resize(checkScreenSize);
    });


  }
  isLoginRoute(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }

  logout() {
   
    this.authService.logout();
    this.cookieService.deleteCookie('token'); 
    this.cookieService.deleteCookie('id_user'); 

    this.router.navigate(['/login']);
  }
  toggleMenu() {
    const navContainer = document.querySelector('.nav-container');
    navContainer?.classList.toggle('active');
  }

  updateUsername(username: string) {
    this.usernameSubject.next(username);
  }
}

