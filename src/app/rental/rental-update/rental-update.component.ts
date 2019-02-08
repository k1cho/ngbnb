import { Component, OnInit } from '@angular/core';
import { Rental } from '../shared/rental.model';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { UcWordsPipe } from 'ngx-pipes';

@Component({
  selector: 'app-rental-update',
  templateUrl: './rental-update.component.html',
  styleUrls: ['./rental-update.component.scss']
})
export class RentalUpdateComponent implements OnInit {
  rental: Rental;
  rentalCategories: string[] = Rental.CATEGORIES;
  locationSubject: Subject<any> = new Subject();

  constructor(
      private route: ActivatedRoute,
      private rentalService: RentalService,
      private ucwords: UcWordsPipe) {
        this.transformLocation = this.transformLocation.bind(this);
      }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.getRental(params['id']);
      });
  }

  transformLocation(location: string): string {
    return this.ucwords.transform(location);
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
        if (rentalData.city || rentalData.street) {
          this.locationSubject.next(this.rental.city + ', ' + this.rental.street);
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      });
  }

  countBedroomAssets(number: number) {
    return parseInt(<any>this.rental.bedrooms, 10) + number;
  }

}
