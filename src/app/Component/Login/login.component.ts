import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Login } from 'src/app/Model/Login';
import { AuthService } from 'src/app/Service/auth-service.service';
import * as $ from 'jquery';
import { CookieService } from 'ngx-cookie-service';
import { CookieServic } from 'src/app/Service/cookie.servic';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoad: boolean = false;

  constructor(private cookieService:CookieServic,private titulo:Title,private route: Router, private formBuilder: FormBuilder, private authService: AuthService, private httpClient: HttpClient) { 

    this.loginForm = this.formBuilder.group({

      username: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5), Validators.email]],
      password: [''/*, [Validators.required, Validators.maxLength(25), Validators.minLength(8)]*/]
    })

  }
  
  
  


  ngOnInit(): void {

    $('#eye-icon').click(() => {
      let eyeIcon = $('#eye-icon');
      let passwordInput = $('#floatingPassword');
    
      if (eyeIcon.hasClass('fa-eye')) {
        eyeIcon.removeClass('fa-eye').addClass('fa-eye-slash');
        passwordInput.attr('type', 'text');  
      } else {
        eyeIcon.removeClass('fa-eye-slash').addClass('fa-eye');
        passwordInput.attr('type', 'password');
      }
    });
  
    
  }

  submitLogin() {

    if (this.loginForm.valid) {
      this.logIn();
      $('#btn-login').prop('disabled', true).css('visibility', 'hidden')
      this.isLoad = true;
      $("#btnIniciar").prop("disabled",true);


    } else{
      alert("Hay campos vacíos / erroneos");
    }
  }

  logIn(): void {

    const user: Login = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value,
    }

    this.authService.logIn(user).subscribe(

      (data: any) => {
        this.isLoad = false;
        this.authService.isLogued = true;
        this.cookieService.setCookie("token",data.token);
        this.cookieService.setCookie("id_user",data.id_user);
        this.route.navigate(['/dashboard']);

      }, (err: any) => {
        console.log(err.error);
        alert(err.error.message)
        $("#btnIniciar").prop("disabled",false);

      }
    )


   
  }
}


  

