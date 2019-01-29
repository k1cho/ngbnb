import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPipesModule} from 'ngx-pipes';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Daterangepicker } from 'ng2-daterangepicker';
import { FormsModule } from '@angular/forms';

import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';


import { MapModule } from '../common/map/map.module';
import { AuthGuard } from '../auth/shared/auth.guard';

import { HelperService } from '../common/service/helper.service';
import { RentalService } from './shared/rental.service';
import { BookingService } from '../booking/shared/booking.service';

import { UppercasePipe } from '../common/pipes/uppercase.pipe';

const routes: Routes = [
  {
    path: 'rentals',
    component: RentalComponent,
    children: [
     { path: '', component: RentalListComponent },
     { path: ':id', component: RentalDetailComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  declarations: [
    RentalListComponent,
    RentalListItemComponent,
    RentalComponent,
    RentalDetailComponent,
    RentalDetailBookingComponent,
    UppercasePipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    NgPipesModule,
    MapModule,
    Daterangepicker,
    FormsModule
  ],
  providers: [
    RentalService,
    AuthGuard,
    HelperService,
    BookingService
  ]
})
export class RentalModule {

}
