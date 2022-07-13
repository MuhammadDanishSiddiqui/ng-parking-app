import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingPlacesComponent } from './booking-places/booking-places.component';
import { SharedModule } from '../shared/shared.module';
import { BookingsComponent } from './bookings/bookings.component';
import { BookingComponent } from './booking/booking.component';
import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    BookingPlacesComponent,
    BookingsComponent,
    BookingComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class BookingsModule { }
