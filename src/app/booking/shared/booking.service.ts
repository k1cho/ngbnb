import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from './booking.model';
import { Observable } from 'rxjs';

@Injectable()
export class BookingService {

  constructor(private http: HttpClient) {}

  public store(booking: Booking): Observable<any> {
    return this.http.post('http://localhost:3001/api/bookings', booking);
  }
}
