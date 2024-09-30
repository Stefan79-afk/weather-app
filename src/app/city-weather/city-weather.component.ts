import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherServiceService } from '../weather-service.service';
import { catchError, Observable, throwError } from 'rxjs';
import { Current } from '../current';
import { HttpErrorResponse } from '@angular/common/http';
import { LocataionWeatherComponent } from '../location-weather/location-weather.component';

@Component({
  selector: 'app-city-weather',
  standalone: true,
  imports: [LocataionWeatherComponent],
  templateUrl: './city-weather.component.html',
  styleUrl: './city-weather.component.css'
})
export class CityWeatherComponent implements OnInit {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private weatherService = inject(WeatherServiceService);

  cityName!: string;
  loading: boolean = true;
  weatherInfo!: Current;
  error: string | null = null;

  ngOnInit(): void {
      const cityName = this.route.snapshot.paramMap.get('cityName');
      this.cityName = cityName!;
      this.weatherService.getWeatherForCityName(cityName!)
      .pipe(
        catchError( this.handleWeatherFetchError.bind(this))
      )
      .subscribe(this.handleWeatherFetchSuccess.bind(this));
  }

  handleWeatherFetchSuccess(data: Current) {
    this.weatherInfo = data;
    this.loading = false;
  }

  handleWeatherFetchError(error: HttpErrorResponse, caught: Observable<Current>) {
    if(error.statusText === "Unknown Error") {
      this.error = `We couldn't get the weather data for ${this.cityName}. Please try again later.`
    } else {
      this.error = error.message;
    }

    this.loading = false;
    return throwError(() => new Error(error.message));
  }
}
