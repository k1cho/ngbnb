import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { RentalService } from './rental.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class RentalGuard implements CanActivate {

  constructor(private router: Router, private rentalService: RentalService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      const rentalId: string = route.params.id;

      return this.rentalService.verifyRentalUser(rentalId).pipe(
        map(() => {
          return true;
        }), catchError(() => {
          this.router.navigate(['/rentals']);
          return of(false);
        }));
  }
}
