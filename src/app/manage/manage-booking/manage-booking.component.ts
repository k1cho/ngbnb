import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BookingService } from 'src/app/booking/shared/booking.service';
import { Booking } from 'src/app/booking/shared/booking.model';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {
  userBookings: Booking[];
  errors: any[] = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.getBookings();
  }

  getBookings() {
    return this.bookingService.getUserBookings().subscribe(
      (bookings: Booking[]) => {
        this.userBookings = bookings;
      },
      (errors: HttpErrorResponse) => {
        this.errors = errors.error;
      });
  }

}
