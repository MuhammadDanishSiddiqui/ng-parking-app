import { Injectable } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  places: any[] = []
  bookings: any[] = []

  constructor(private authService: AuthService, private firestore: Firestore) { }

  getBookingPlaces(successCallBack: (data) => void) {
    const colRef = collection(this.firestore, 'places')
    this.places = []
    getDocs(colRef).then(snapshots => {
      snapshots.docs.forEach(doc => {
        this.places.push({ id: doc.id, ...doc.data() })
      })
      successCallBack(this.places)
    })
  }

  async addBooking(bookingData: any, successCallBack) {
    const colRef = doc(this.firestore, 'places', bookingData.placeId)
    const placeSnapshot = await getDoc(colRef)
    const slots = placeSnapshot?.data()?.['slots']
    const bookingSlot = slots.findIndex(slot => slot.id == bookingData.slot_id)
    let bookingIndex
    slots.forEach(slot => {
      const isFound = slot.bookings.findIndex(booking => booking.booking_id == bookingData.booking_id)
      if (isFound) {
        bookingIndex = isFound
      }
    })
    if (bookingIndex > -1) {
      slots[bookingSlot].bookings[bookingIndex] = {
        place: bookingData.place,
        phone: bookingData.phone,
        vehicle_model: bookingData.vehicle_model,
        license_plate: bookingData.license_plate,
        entry_time: bookingData.entry_time,
        exit_time: bookingData.exit_time,
        slot_id: bookingData.slot_id,
        place_id: bookingData.placeId,
        userId: slots[bookingSlot].bookings[bookingIndex].userId,
        booking_id: bookingData.booking_id
      }
    }
    else {
      slots[bookingSlot].bookings.push({
        place: bookingData.place,
        phone: bookingData.phone,
        vehicle_model: bookingData.vehicle_model,
        license_plate: bookingData.license_plate,
        entry_time: bookingData.entry_time,
        exit_time: bookingData.exit_time,
        slot_id: bookingData.slot_id,
        place_id: bookingData.placeId,
        userId: this.authService.currentUser.id,
        booking_id: Math.random() * 10000
      })
    }
    updateDoc(colRef, { slots }).then(() => {
      successCallBack()
    })
  }

  async updateBooking(bookingData: any, successCallBack) {
    const colRef = doc(this.firestore, 'places', bookingData.placeId)
    const placeSnapshot = await getDoc(colRef)
    const slots = placeSnapshot?.data()?.['slots']
    let booking
    slots.forEach(slot => {
      const isFound = slot.bookings.find(booking => booking.booking_id == bookingData.booking_id)
      if (isFound) {
        booking = isFound
      }
    }
    )
    this.deleteBooking(booking.place_id, booking.booking_id, () => {
      this.addBooking(bookingData, () => {
        successCallBack()
      })
    })
  }

  getBookings(successCallBack: (data) => void) {
    onSnapshot(collection(this.firestore, 'places'), (snapshot) => {
      let bookings = []
      snapshot.docs.forEach(doc => {
        doc.data()?.['slots'].forEach(slot => {
          const bookedSlots = slot.bookings.filter(booking => booking.userId == this.authService.currentUser.id)
          if (bookedSlots.length > 0) {
            bookings.push(...bookedSlots)
          }
          this.bookings = bookings
          successCallBack(bookings)
        })
      })
    });
  }

  getAllBookings(successCallBack: (data) => void) {
    onSnapshot(collection(this.firestore, 'places'), (snapshot) => {
      let bookings = []
      snapshot.docs.forEach(doc => {
        doc.data()?.['slots'].forEach(slot => {
            bookings.push(...slot.bookings)
        })
      })
      this.bookings = bookings
      successCallBack(bookings)
    });
  }

  async deleteBooking(placeId: string, bookingId: string, successCallBack) {
    const colRef = doc(this.firestore, 'places', placeId)
    const SlotsSnapshot = await getDoc(colRef)
    const slots = SlotsSnapshot.data()?.['slots']
    slots.forEach((slot, index) => {
      const deleteIndex = slot.bookings.findIndex(booking => booking.booking_id == bookingId)
      if (deleteIndex > -1) {
        slots[index].bookings.splice(deleteIndex, 1)
      }
    })
    await updateDoc(colRef, { slots })
    successCallBack()
  }

}
