import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class RentalService {
  constructor(private http: HttpClient) {

  }

  public getRentalById(id: string): Observable<Rental> {
    return <Observable<Rental>>this.http.get('http://localhost:3001/api/rentals/' + id);
  }
  public getRentals(): Observable<Rental[]> {
    return <Observable<Rental[]>>this.http.get('http://localhost:3001/api/rentals');
  }
}
