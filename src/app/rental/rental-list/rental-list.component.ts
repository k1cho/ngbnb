import { Component, OnInit } from '@angular/core';
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.scss']
})

export class RentalListComponent implements OnInit {

  rentals: Rental[] = [];

  constructor(private rentalService: RentalService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.rentalService.getRentals()
      .subscribe(
        (data: Rental[]) => {
          this.rentals = data;
        },
        (err) => {

        },
        () => {

        }
      );
  }

}
