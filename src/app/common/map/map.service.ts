import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CamelizePipe } from 'ngx-pipes';

@Injectable()
export class MapService {

  private geocoder;

  private locationCache: any = {};

  constructor(private camelizePipe: CamelizePipe) {}

  private cacheLocation(location: string, coordinates: any) {
    const camelizedLocation = this.camelize(location);

    this.locationCache[camelizedLocation] = coordinates;
  }

  private isLocationCached(location): boolean {
    return this.locationCache[this.camelize(location)];
  }

  private camelize(location: string): string {
    return this.camelizePipe.transform(location);
  }

  public getGeolocation(location: string): Observable<any> {
    this.geocoder = new (<any>window).google.maps.Geocoder();

    return new Observable((observer) => {
      if (this.isLocationCached(location)) {
        observer.next(this.locationCache[this.camelize(location)]);
      } else {
        this.geocoder.geocode({address: location}, (result, status) => {
          if (status === 'OK') {
            const geometry = result[0].geometry.location;
            const coordinates = {lat: geometry.lat(), lng: geometry.lng()};

            this.cacheLocation(location, coordinates);

            observer.next(coordinates);
          } else {
            observer.error('Location could not be geocoded');
          }
        });
      }
    });
  }
}
