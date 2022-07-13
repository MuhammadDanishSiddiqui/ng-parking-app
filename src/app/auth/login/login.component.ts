import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
  isLoading: boolean = false;

  constructor(private auth:AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLoginUser() {
    this.isSubmitted = true
    if(this.loginForm.invalid)
    {
      return
    }
    else {
      this.isLoading = true
      this.auth.signInUser(this.loginForm.value,()=>{
        this.isLoading = false
        this.router.navigate(['/profile']);
      },(error)=>{
        this.isLoading = false
        alert(error.message)
      })
    }
  }
  
  get userEmail() {
    return this.loginForm.get('email');
  }
  get userPassword() {
    return this.loginForm.get('password');
  }


}
