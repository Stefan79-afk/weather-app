import { Component, inject } from '@angular/core';

import { DatePipe, AsyncPipe } from '@angular/common';
import { UserLocationService } from '../user-location.service';
import { WeatherServiceService } from '../weather-service.service';
import { Current } from '../current';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

import { LocataionWeatherComponent } from '../location-weather/location-weather.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe, AsyncPipe, LocataionWeatherComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  date: Date = new Date();

  weatherData!: Current;
  errorMessage: string | undefined;
  loading: boolean = true;

  userLocationService: UserLocationService = inject(UserLocationService);
  weatherService: WeatherServiceService = inject(WeatherServiceService);

  ngOnInit(): void {
    this.userLocationService.getUserLocation()
    .then(this.handleGeolocationSuccess.bind(this))
    .catch(this.handleGeolocationError.bind(this));
  };

  handleGeolocationSuccess(position: number[]): void {
    const [latitude, longitude] = position;
    this.weatherService.getWeatherForCoordonates(latitude, longitude)
    .pipe(
      catchError(this.handleWeatherFetchFailure.bind(this))
    )
    .subscribe(this.handleWeatherFetchSuccess.bind(this));
  };

  handleGeolocationError(error: Error | GeolocationPositionError): void {
    if("code" in error) {
      switch(error.code) {
        case 1:
          this.errorMessage = "Geolocation blocked by the browser. Please enable location services and try again.";
          break;
        case 2:
          this.errorMessage = "Couldn't get your location. Please try again.";
          break;
        case 3:
          this.errorMessage = "Couldn't get your location in time. Please try again.";
          break;
        default:
          this.errorMessage = `Something else went wrong: ${error.message}`;
      }
    } else {
      this.errorMessage = error.message;
    }

    this.loading = false;
  };

  handleWeatherFetchSuccess(weatherData: Current) {
    this.weatherData = weatherData;
    this.loading = false;
  }

  handleWeatherFetchFailure(error: HttpErrorResponse, caught: Observable<Current>): Observable<Current> {
    if(error.statusText === "Unknown Error") {
      this.errorMessage = "We couldn't get the weather data for your location. Please try again later."
    }
    else {
      this.errorMessage = error.message;
    }
    
    this.loading = false;
    return throwError(() => new Error(error.message));
  }

}

