import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
  isLoading: boolean = false;

  constructor(private auth:AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSignUpUser() {
    this.isSubmitted = true
    if(this.signUpForm.invalid) return
      this.isLoading = true
      this.auth.signUpUser(this.signUpForm.value,()=>{
        this.isLoading = false
        alert('Signedup successfully')
        this.router.navigate(['/profile']);
      },(error)=>{
        this.isLoading = false
        alert(error.message)
      })
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
