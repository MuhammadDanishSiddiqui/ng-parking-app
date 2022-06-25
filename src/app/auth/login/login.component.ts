import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  isSubmitted: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onLoginUser() {
    this.isSubmitted = true
    console.log(this.loginForm)
  }

  get userName() {
    return this.loginForm.get('name');
  }
  get userEmail() {
    return this.loginForm.get('email');
  }
  get userPassword() {
    return this.loginForm.get('password');
  }


}
