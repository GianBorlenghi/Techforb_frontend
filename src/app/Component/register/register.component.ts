import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/User';
import { AuthService } from 'src/app/Service/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  pass_regex = "(?=.*[-!#$%&/().,?¡_])(?=.*[A-Z])(?=.*[a-z]).{8,}";
  today: any = new Date();
  ageValid: boolean=true;
  registerForm:FormGroup;
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private route:Router) { 
    this.registerForm = this.formBuilder.group({

      name: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(3), Validators.pattern('^[a-zA-ZÀ-ÿñÑ]+( [a-zA-ZÀ-ÿñÑ]+)*$')]],
      surname: ['', [Validators.required, Validators.maxLength(35), Validators.minLength(3), Validators.pattern('^[a-zA-ZÀ-ÿñÑ]+( [a-zA-ZÀ-ÿñÑ]+)*$')]],
      dateOfBirth: ['', [Validators.required]],
      province: ['', [Validators.required]],
      city: ['', [Validators.required]],
      username: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.maxLength(25), Validators.minLength(8), Validators.pattern(this.pass_regex)]]
    })
  }

  ngOnInit(): void {


  }

  submitRegister(){
    const user:User = {
      name: (this.registerForm.get('name')?.value).trim(),
      surname: (this.registerForm.get('surname')?.value).trim(),
      username: (this.registerForm.get('username')?.value).trim(),
      date_of_birth: this.registerForm.get('dateOfBirth')?.value,
      province: this.registerForm.get('province')?.value,
      city: this.registerForm.get('city')?.value,
      password: this.registerForm.get('password')?.value
    }

    if (this.registerForm.valid) {
      this.authService.register(user).subscribe(
        (data:any)=>{
          alert(data)
          this.route.navigate(['/login']);

        },(error:any)=>{
          alert(error.error.message);
        }
      )
    }
  }

  validateBirth() {
    $('#date_of_birth').focusout((e) => {
      e.stopImmediatePropagation();
      let value = $('#date_of_birth').val()
      let age = this.getAge(value);
      console.log(age);
      if (age >= 18 && age < 90) {
        $('#date_of_birth').css('border', 'none')
        this.ageValid = true;
      } else {
        $('#date_of_birth').css('border', '1px solid #a22')
        this.ageValid = false;
      }
    })

  }

  getAge(db: any) {
    let dateOfBirth = new Date(db);
    let years = this.today.getFullYear() - dateOfBirth.getFullYear();
    let months = this.today.getMonth() - dateOfBirth.getMonth();

    if (months < 0 || (months === 0 && this.today.getDate() < dateOfBirth.getDate())) {
      years--;
    }
    return years;
  }
  }


