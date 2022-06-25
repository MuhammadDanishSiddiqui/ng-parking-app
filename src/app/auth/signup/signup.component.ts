import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  isSubmitted: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onSignUpUser() {
    this.isSubmitted = true
    console.log(this.signUpForm)
  }

  get userName() {
    return this.signUpForm.get('name');
  }
  get userEmail() {
    return this.signUpForm.get('email');
  }
  get userPassword() {
    return this.signUpForm.get('password');
  }

}
