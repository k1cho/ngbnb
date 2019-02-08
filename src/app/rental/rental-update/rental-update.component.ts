import { Component, OnInit } from '@angular/core';
import { Rental } from '../shared/rental.model';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-rental-update',
  templateUrl: './rental-update.component.html',
  styleUrls: ['./rental-update.component.scss']
})
export class RentalUpdateComponent implements OnInit {
  rental: Rental;

  constructor(private route: ActivatedRoute, private rentalService: RentalService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getRental(params['id']);
    });
  }

  getRental(id: string) {
    this.rentalService.getRentalById(id).subscribe((rental: Rental) => {
      this.rental = rental;
    });
  }

  updateRental(id: string, rentalData: Rental) {
    this.rentalService.updateRental(id, rentalData).subscribe(
      (updatedRental: Rental) => {
        this.rental = updatedRental;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

}
