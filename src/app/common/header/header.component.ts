import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { RentalService } from 'src/app/rental/shared/rental.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  title: 'ngbnb';
  city: string;
  options: {
    types: [],
    componentRestrictions: { country: 'UA' }
  };

  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  handleAddressChange(address: any) {
    this.city = address.address_components[0].long_name;
  }

  constructor(public auth: AuthService,
              private router: Router,
              private rentalService: RentalService) {}

  logout() {
    this.auth.logout();

    this.router.navigate(['login']);
  }

  search(city: string, lowPrice: number, highPrice: number) {
    city = this.city;
    this.router.navigate(['rentals/search/' + city + '/' + lowPrice + '/' + highPrice]);
  }
}
