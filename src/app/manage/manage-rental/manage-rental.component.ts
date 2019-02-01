import { Component, OnInit } from '@angular/core';
import { RentalService } from 'src/app/rental/shared/rental.service';
import { Rental } from 'src/app/rental/shared/rental.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manage-rental',
  templateUrl: './manage-rental.component.html',
  styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {
  userRentals: Rental[];
  errors: any[] = [];

  rentalDeleteIndex: number;

  constructor(private rentalService: RentalService) { }

  ngOnInit() {
    this.getRentals();
  }

  getRentals() {
    return this.rentalService.getUserRentals().subscribe(
      (rentals: Rental[]) => {
        this.userRentals = rentals;
      },
      (errors: HttpErrorResponse) => {
        this.errors = errors.error;
      });
  }

  deleteRental(rentalId: string) {
    this.rentalService.deleteRental(rentalId).subscribe(
      () => {
        this.userRentals.splice(this.rentalDeleteIndex, 1);
        this.rentalDeleteIndex = undefined;
      },
      (errors: HttpErrorResponse) => {
        alert(errors.error.errors[0]);
      });
  }

}
