import { Component, OnInit } from '@angular/core';
import { Rental } from '../shared/rental.model';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';

@Component({
  selector: 'app-rental-search',
  templateUrl: './rental-search.component.html',
  styleUrls: ['./rental-search.component.scss']
})
export class RentalSearchComponent implements OnInit {
  rentals: Rental[] = [];

  city: string;
  lowPrice: number;
  highPrice: number;

  constructor(private route: ActivatedRoute, private rentalService: RentalService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.city = params['city'];
      this.lowPrice = params['lowPrice'];
      this.highPrice = params['highPrice'];

      this.searchRentals();
    });
  }

  searchRentals() {
    this.rentals = [];

    this.rentalService.searchRentals(this.city, this.lowPrice, this.highPrice).subscribe(
      (rentals: Rental[]) => {
        this.rentals = rentals;
        console.log(this.rentals);
      });
  }

}
