import { Component, OnInit } from '@angular/core';
import { BookingsService } from 'src/app/services/bookings.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  constructor(private authService:AuthService,private bookingService: BookingsService, private router: Router) { }

  bookings = this.bookingService.bookings;
  isLoading: boolean = false
  currentUser = this.authService.currentUser

  ngOnInit(): void {
    if( this.currentUser.role == 'user')
    {
      this.bookingService.getBookings((bookings)=>{
        this.bookings = bookings
      })
    }
    else {
      this.bookingService.getAllBookings((bookings)=>{
        this.bookings = bookings
      })
    }
  }

  formatedDate(entry,exit){
    return moment(entry).format('LLL') + " - " + moment(exit).format('LLL');
  }

  onDelete(placeId:string,bookingId: string){
    this.isLoading = true;
    this.bookingService.deleteBooking(placeId,bookingId,()=>{
      this.isLoading = false
    })
  }

  onEdit(placeId,bookingId){
    this.router.navigateByUrl(`/booking/${placeId}?bookingId=${bookingId}`);
  }

}
