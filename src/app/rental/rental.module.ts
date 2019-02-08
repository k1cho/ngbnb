import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPipesModule, UcWordsPipe } from 'ngx-pipes';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Daterangepicker } from 'ng2-daterangepicker';
import { FormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

import { RentalComponent } from './rental.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';
import { RentalSearchComponent } from './rental-search/rental-search.component';
import { RentalCreateComponent } from './rental-create/rental-create.component';
import { RentalUpdateComponent } from './rental-update/rental-update.component';

import { MapModule } from '../common/map/map.module';
import { AuthGuard } from '../auth/shared/auth.guard';
import { RentalGuard } from './shared/rental.guard';
import { EditableModule } from '../common/components/editable/editable.module';

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
     { path: 'new', component: RentalCreateComponent, canActivate: [AuthGuard] },
     { path: ':id/edit', component: RentalUpdateComponent, canActivate: [AuthGuard, RentalGuard] },
     { path: 'search/:city/:lowPrice/:highPrice', component: RentalSearchComponent },
     { path: ':id', component: RentalDetailComponent }
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
    RentalSearchComponent,
    RentalCreateComponent,
    RentalUpdateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    NgPipesModule,
    MapModule,
    Daterangepicker,
    FormsModule,
    GooglePlaceModule,
    EditableModule
  ],
  providers: [
    RentalService,
    AuthGuard,
    HelperService,
    BookingService,
    UcWordsPipe,
    RentalGuard
  ]
})
export class RentalModule {

}
