import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { CookieServic } from 'src/app/Service/cookie.servic';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm:FormGroup;
  pass_regex = "(?=.*[-!#$%&/().,?¡_])(?=.*[A-Z])(?=.*[a-z]).{8,}";

  constructor(private cookieService:CookieServic,private route:Router,private userService:UserService,private formBuilder:FormBuilder) { 
    this.profileForm = this.formBuilder.group({

      name: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(3), Validators.pattern('^[a-zA-ZÀ-ÿñÑ]+( [a-zA-ZÀ-ÿñÑ]+)*$')]],
      surname: ['', [Validators.required, Validators.maxLength(35), Validators.minLength(3), Validators.pattern('^[a-zA-ZÀ-ÿñÑ]+( [a-zA-ZÀ-ÿñÑ]+)*$')]],
      province: ['', [Validators.required]],
      city: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(8), Validators.pattern(this.pass_regex)]]
    })

    /*this.profileForm.patchValue({
      name:
    });
*/
  }

  ngOnInit(): void {
  }


  submitEditProfile(){

    const user:User = {
      name: (this.profileForm.get('name')?.value).trim(),
      surname: (this.profileForm.get('surname')?.value).trim(),
      province: this.profileForm.get('province')?.value,
      city: this.profileForm.get('city')?.value,
      password: this.profileForm.get('password')?.value
    }
    
    if (this.profileForm.valid) {
      $('#btnEdit').prop('disabled',true);
      this.userService.updateProfile(this.cookieService.getCookie("id_user"),user).subscribe(
        (data:any)=>{
          console.log(data)
          this.route.navigate(['/dashboard']);
        },(error:any)=>{
          $('#btnEdit').prop('disabled',false);
          alert(error.error.message);
        }
      )
    }
  }
}
