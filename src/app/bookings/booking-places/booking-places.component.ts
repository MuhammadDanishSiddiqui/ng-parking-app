import { Component, OnInit } from '@angular/core';
import { BookingsService } from 'src/app/services/bookings.service';

@Component({
  selector: 'app-booking-places',
  templateUrl: './booking-places.component.html',
  styleUrls: ['./booking-places.component.css']
})
export class BookingPlacesComponent implements OnInit {

  constructor( private bookings:BookingsService) { }

  places = this.bookings.places

  ngOnInit(): void {
    this.bookings.getBookingPlaces((places)=>{
      this.places = places
    })
  }

}
