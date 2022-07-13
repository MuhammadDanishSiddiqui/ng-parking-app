import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(8)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl(null),
    address: new FormControl(''),
  });
  isSubmitted: boolean = false;
  isLoading: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.profileForm.disable()
    this.profileForm.patchValue({
      name: this.auth?.currentUser?.name,
      email: this.auth?.currentUser?.email,
      phone: this.auth?.currentUser?.phone,
      address: this.auth?.currentUser?.address
    });
  }

  onUpdateProfile() {
    this.isSubmitted = true
    if(this.profileForm.invalid)
    return
    this.isLoading = true
    this.profileForm.disable()
    this.auth.updateUserProfile(this.profileForm.value,()=>{
      this.isSubmitted = false
      this.isLoading = false
      alert('Profile updated')
    })
  }

  get userName() {
    return this.profileForm.get('name');
  }

  onEditForm(){
    this.profileForm.enable()
    this.profileForm?.get('email')?.disable()
  }

}
