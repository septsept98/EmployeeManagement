import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {
  loginForm: FormGroup;
  loginError: String = '';

  constructor(private router: Router, private fb: FormBuilder){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm?.valid){
      const {username, password} = this.loginForm.value;

      if (username === 'admin' && password === 'admin123'){
        this.router.navigateByUrl('/management/employee');
      } else {
        this.loginError = 'Username atau Password salah';
      }
    } else {
      this.loginForm?.markAllAsTouched();
    }
  } 

}
