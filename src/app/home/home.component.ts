import { Component, inject } from '@angular/core';

import { DatePipe } from '@angular/common';
import { UserLocationService } from '../user-location.service';
import { apiKey } from '../environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  date: Date = new Date();

  latitude: number | undefined = undefined;
  longitude: number | undefined = undefined;
  positionError: string | undefined = undefined;

  userLocationService: UserLocationService = inject(UserLocationService);

  ngOnInit(): void {
    this.userLocationService.getUserLocation()
    .then((position: number[]) => {
      [this.latitude, this.longitude] = position;
      console.log(`Your latitude is ${this.latitude}`);
      console.log(`Your longitutde is ${this.longitude}`)
    })
    .catch( ( error: Error | GeolocationPositionError ) => {
      if(error instanceof GeolocationPositionError) {
        console.log(error.code);
      }

      console.log(error.message);
      this.positionError = error.message;
    });
  }
}
