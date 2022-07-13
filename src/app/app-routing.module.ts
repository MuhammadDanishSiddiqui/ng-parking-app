import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BookingPlacesComponent } from './bookings/booking-places/booking-places.component';
import { BookingComponent } from './bookings/booking/booking.component';
import { BookingsComponent } from './bookings/bookings/bookings.component';
import { ProfileComponent } from './shared/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: BookingPlacesComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'booking/:id', component: BookingComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
