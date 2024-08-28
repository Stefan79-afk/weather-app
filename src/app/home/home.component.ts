import { Component, inject } from '@angular/core';

import { DatePipe } from '@angular/common';
import { UserLocationService } from '../user-location.service';
import { Observable } from 'rxjs';
import { WeatherServiceService } from '../weather-service.service';
import { Current } from '../current';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  date: Date = new Date();

  latitude: number | undefined = undefined;
  longitude: number | undefined = undefined;
  positionError: string | undefined = undefined;

  weatherInfo$!: Observable<any>;

  userLocationService: UserLocationService = inject(UserLocationService);
  weatherService: WeatherServiceService = inject(WeatherServiceService);

  ngOnInit(): void {
    this.userLocationService.getUserLocation()
    .then((position: number[]) => {
      [this.latitude, this.longitude] = position;
      debugger;
      console.log(`Your latitude is ${this.latitude}`);
      console.log(`Your longitutde is ${this.longitude}`)
      this.weatherInfo$ = this.weatherService.getWeatherForCoordonates(this.latitude, this.longitude);
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
