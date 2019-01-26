import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import { NgPipesModule } from 'ngx-pipes';
import { MapService } from './map.service';
import { CamelizePipe } from 'ngx-pipes';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MapComponent,
  ],

  exports: [
    MapComponent,
  ],

  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBoFAPokmUce-ZGCY4BJioYsgKe05Orc54'
    }),
    NgPipesModule,
    CommonModule,
  ],
  providers: [MapService, CamelizePipe],
})
export class MapModule { }
