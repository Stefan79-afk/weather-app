import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiKey, currentWeatherUrl } from './environment';
import { Current } from './current';

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  httpClient: HttpClient = inject(HttpClient);
  constructor() { }
  getWeatherForCoordonates(latitude: number, longitude: number): Observable<Current> {
    return this.httpClient.get<any>(`${currentWeatherUrl}`, {
      params: {
        key: apiKey,
        q: `${latitude},${longitude}`
      }
    });
  }

  getWeatherForCityName(cityName: string): Observable<Current> {
    return this.httpClient.get<any>(`${currentWeatherUrl}`, {
      params: {
        key: apiKey,
        q: cityName
      }
    });
  }
}
