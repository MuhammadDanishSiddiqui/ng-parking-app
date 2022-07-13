import { Component, OnInit } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { BookingsService } from 'src/app/services/bookings.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookingForm: FormGroup = new FormGroup({
    place: new FormControl({value:'',disabled:true}, [Validators.required, Validators.maxLength(8)]),
    phone: new FormControl(null, [Validators.required]),
    vehicle_model: new FormControl('', [Validators.required]),
    license_plate: new FormControl('', [Validators.required]),
    entry_time: new FormControl('', [Validators.required]),
    exit_time: new FormControl('', [Validators.required]),
    slot_id: new FormControl('', [Validators.required]),
  });
  isSubmitted: boolean = false;
  isLoading: boolean = false;
  placeId: string = '';
  bookingId: string = '';
  filteredSlots: any[] = [];

  constructor(private booking: BookingsService ,private firestore: Firestore, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.bookingForm.valueChanges.subscribe(() => {
      if (this.bookingForm.value.entry_time != "" && this.bookingForm.value.exit_time != "") {
        this.getSlots()
      }
    }
    )
    this.route.params.subscribe(params => {
      this.placeId = params['id'];
      this.getPlace(this.placeId)
    });
    this.route.queryParams.subscribe(params => {
      this.bookingId = params['bookingId'];
      if(params['bookingId']){
        this.getBookingDetails()
      }
    });
  }

  get place() {
    return this.bookingForm.get('place');
  }
  get phone() {
    return this.bookingForm.get('phone');
  }
  get vehicleModel() {
    return this.bookingForm.get('vehicle_model');
  }
  get licensePlate() {
    return this.bookingForm.get('license_plate');
  }
  get entryTime() {
    return this.bookingForm.get('entry_time');
  }
  get exitTime() {
    return this.bookingForm.get('exit_time');
  }
  get slotId() {
    return this.bookingForm.get('slot_id');
  }

  onAddBooking() {
    this.isSubmitted = true;
    if (this.bookingForm.invalid)
      return
      this.isLoading = true;
      this.booking.addBooking({
        place: this.bookingForm.get('place').value,
        phone: this.bookingForm.value.phone ,
        vehicle_model: this.bookingForm.value.vehicle_model,
        license_plate: this.bookingForm.value.license_plate ,
        entry_time: this.bookingForm.value.entry_time,
        exit_time: this.bookingForm.value.exit_time,
        slot_id: this.bookingForm.value.slot_id,
        placeId: this.placeId,
      },()=>{
        this.isLoading = false;
        this.router.navigate(['/bookings']);
      })
  }

  onUpdateBooking() {
    this.isSubmitted = true;
    if (this.bookingForm.invalid)
      return
      this.isLoading = true;
      this.booking.updateBooking({
        place: this.bookingForm.get('place').value,
        phone: this.bookingForm.value.phone ,
        vehicle_model: this.bookingForm.value.vehicle_model,
        license_plate: this.bookingForm.value.license_plate ,
        entry_time: this.bookingForm.value.entry_time,
        exit_time: this.bookingForm.value.exit_time,
        slot_id: this.bookingForm.value.slot_id,
        placeId: this.placeId,
        booking_id: this.bookingId
      },()=>{
        this.isLoading = false;
        this.router.navigate(['/bookings']);
      })

  }

  getSlots() {
    const placeRef = doc(this.firestore, 'places', this.placeId)
    getDoc(placeRef).then(snapshot => {
      this.filteredSlots = snapshot?.data()?.['slots']?.filter(slot => {
        const isBooked = slot.bookings.find(booking => {
          return moment(booking.entry_time).valueOf() >= moment(this.bookingForm.value.entry_time).valueOf() && moment(booking.exit_time).valueOf() <= moment(this.bookingForm.value.exit_time).valueOf()
        })
        if (isBooked)
          return false
        return slot
      })
    })
  }

  getPlace(id: string) {
    const placeRef = doc(this.firestore, 'places', id)
    getDoc(placeRef).then(snapshot => {
      this.bookingForm.patchValue({
        place: snapshot?.data()?.['title']
      });
    })
  }

getBookingDetails(){
  const placeRef = doc(this.firestore, 'places', this.placeId)
  getDoc(placeRef).then(snapshot => {
    snapshot?.data()?.['slots']?.forEach(slot => {
      const bookingDetails = slot.bookings.find(slot=>slot.booking_id == this.bookingId)
      if(bookingDetails)
      {
        this.bookingForm.patchValue({
          place: bookingDetails.place,
          phone: bookingDetails.phone ,
          vehicle_model: bookingDetails.vehicle_model,
          license_plate: bookingDetails.license_plate ,
          entry_time: bookingDetails.entry_time,
          exit_time: bookingDetails.exit_time,
          slot_id: bookingDetails.slot_id,
          placeId: bookingDetails.placeId,
          booking_id: bookingDetails.bookingId
        });
      }
    })
  })
}

}
