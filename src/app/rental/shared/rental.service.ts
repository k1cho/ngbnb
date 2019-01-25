import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';

@Injectable({providedIn: 'root'})
export class RentalService {
  private rentals: Rental[] = [
    {
      id: 'gfsafgasfasgas',
      image: 'url',
      city: 'New York',
      title: 'new york home',
      price: 250,
      street: 'times square',
      category: 'condo',
      bedrooms: 3,
      description: 'lijepo mjesto',
      shared: false,
      createdAt: '24/12/2012',
    },
    {
      id: 'dsadasasd',
      image: 'url',
      city: 'New jersey',
      title: 'new jersey home',
      price: 250,
      street: 'times square',
      category: 'condo',
      bedrooms: 3,
      description: 'lijepo mjesto',
      shared: false,
      createdAt: '24/12/2012',
    },
    {
      id: 'asdasdsa',
      image: 'url',
      city: 'Bos Krupa',
      title: 'Bos Krupa home',
      price: 250,
      street: 'times square',
      category: 'condo',
      bedrooms: 3,
      description: 'lijepo mjesto',
      shared: false,
      createdAt: '24/12/2012',
    },
    {
      id: 'asdasdasdasdsa',
      image: 'url',
      city: 'Split',
      title: 'Split home',
      price: 250,
      street: 'times square',
      category: 'condo',
      bedrooms: 3,
      description: 'lijepo mjesto',
      shared: false,
      createdAt: '24/12/2012',
    },
  ];

  public getRentalById(id: string): Observable<Rental> {
    return new Observable<Rental>((observer) => {
      const foundRental = this.rentals.find((rental) => {
        return rental.id === id;
      });
      observer.next(foundRental);
    });
  }

  public getRentals(): Observable<Rental[]> {
    const rentalObservable: Observable<Rental[]> = new Observable((observer) => {
      observer.next(this.rentals);
    });
    return rentalObservable;
  }
}
