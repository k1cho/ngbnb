import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Booking } from 'src/app/booking/shared/booking.model';
import { HelperService } from 'src/app/common/service/helper.service';
import * as moment from 'moment';
import { Rental } from '../../shared/rental.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BookingService } from 'src/app/booking/shared/booking.service';
import { ToastrService } from 'ngx-toastr';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { AuthService } from 'src/app/auth/shared/auth.service';

@Component({
  selector: 'app-rental-detail-booking',
  templateUrl: './rental-detail-booking.component.html',
  styleUrls: ['./rental-detail-booking.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class RentalDetailBookingComponent implements OnInit {
  @Input() rental: Rental;
  @ViewChild(DaterangePickerComponent)
  private picker: DaterangePickerComponent;

  newBooking: Booking;
  modalRef: any;

  daterange: any = {};
  bookedDates: any[] = [];
  errors: any[] = [];

  closeResult: string;

    // see original project for full list of options
    // can also be setup using the config service to apply to multiple pickers
  options: any = {
      locale: { format: Booking.BOOKING_FORMAT },
      alwaysShowCalendars: false,
      opens: 'left',
      autoUpdateInput: false,
      isInvalidDate: this.checkInvalidDates.bind(this)
  };

  constructor(
    private helperService: HelperService,
    private modalService: NgbModal,
    private bookingService: BookingService,
    private toastr: ToastrService,
    public auth: AuthService) {}

  ngOnInit() {
    this.getBookedDates();
    this.newBooking = new Booking();
  }

  private checkInvalidDates(date) {
    return this.bookedDates.includes(this.helperService.formatBookingDate(date)) || date.diff(moment(), 'days') < 0;
  }

  private getBookedDates() {
    const bookings: Booking[] = this.rental.bookings;
    if (bookings && bookings.length > 0) {
      bookings.forEach((booking: Booking) => {
        const dateRange = this.helperService.getBookingRangeOfDates(booking.startAt, booking.endAt);
        this.bookedDates.push(...dateRange);
      });
    }
  }

  private addNewBookingDates(bookingData: any) {
    const dateRange = this.helperService.getBookingRangeOfDates(bookingData.startAt, bookingData.endAt);
    this.bookedDates.push(...dateRange);
  }

  bookRental() {
    this.newBooking.rental = this.rental;

    return this.bookingService.store(this.newBooking).subscribe(
      (bookingData: any) => {
        this.addNewBookingDates(bookingData);
        this.newBooking = new Booking();
        this.modalRef.close();
        this.resetDatePicker();
        this.toastr.success('Booking created.', 'Success!', {
          timeOut: 3000,
          progressAnimation: 'decreasing',
          easing: 'ease-in'
        });
      },
      (err) => {
        this.errors = err.error.message;
      }
    );
  }

  selectedDate(value: any, datepicker?: any) {
    this.options.autoUpdateInput = true;
    // any object can be passed to the selected event and it will be passed back here
    this.newBooking.startAt = this.helperService.formatBookingDate(value.start);
    this.newBooking.endAt = this.helperService.formatBookingDate(value.end);
    this.newBooking.days = -(value.start.diff(value.end, 'days'));
    this.newBooking.totalPrice = this.newBooking.days * this.rental.price;

    // console.log(this.newBooking);

    // or manupulat your own internal property
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }

  private resetDatePicker() {
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());

    this.picker.datePicker.element.val('');
  }

  open(content) {
    this.errors = [];
    this.modalRef = this.modalService.open(content);
  }

}
