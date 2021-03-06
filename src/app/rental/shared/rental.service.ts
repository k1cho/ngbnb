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
    const url = 'http://localhost:3001/api/rentals';
    return <Observable<Rental[]>>this.http.get(url);
  }

  public searchRentals(city: string, lowPrice: number, highPrice: number): Observable<Rental[]> {
    const url = `http://localhost:3001/api/rentals/search?city=${city}&lowPrice=${lowPrice}&highPrice=${highPrice}`;
    return <Observable<Rental[]>>this.http.get(url);
  }

  public createRental(rental: Rental): Observable<Rental> {
    return <Observable<Rental>>this.http.post('http://localhost:3001/api/rentals/store', rental);
  }

  public getUserRentals(): Observable<Rental[]> {
    return <Observable<Rental[]>>this.http.get('http://localhost:3001/api/rentals/manage');
  }

  public deleteRental(id: string): Observable<Rental> {
    return <Observable<Rental>>this.http.delete('http://localhost:3001/api/rentals/' + id);
  }

  public updateRental(id: string, rentalData: Rental): Observable<Rental> {
    return <Observable<Rental>>this.http.patch('http://localhost:3001/api/rentals/' + id, rentalData);
  }

  public verifyRentalUser(id: string): Observable<string> {
    return <Observable<string>>this.http.get('http://localhost:3001/api/rentals/' + id + '/verify-user');
  }
}
