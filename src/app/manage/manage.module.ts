import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPipesModule} from 'ngx-pipes';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/shared/auth.guard';
import { RentalService } from '../rental/shared/rental.service';
import { BookingService } from '../booking/shared/booking.service';

import { ManageComponent } from './manage.component';
import { ManageRentalComponent } from './manage-rental/manage-rental.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { ManageRentalBookingComponent } from './manage-rental/manage-rental-booking/manage-rental-booking.component';


const routes: Routes = [
  {
    path: 'manage',
    component: ManageComponent,
    children: [
     { path: 'rentals', component: ManageRentalComponent, canActivate: [AuthGuard] },
     { path: 'bookings', component: ManageBookingComponent, canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  declarations: [
    ManageComponent,
    ManageRentalComponent,
    ManageBookingComponent,
    ManageRentalBookingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgPipesModule
  ],
  providers: [
    AuthGuard,
    RentalService,
    BookingService
  ]
})
export class ManageModule {

}
