import { inject, Injectable } from '@angular/core';
import { Search } from './search';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiKey, searchWeatherUrl } from './environment';

@Injectable({
  providedIn: 'root'
})
export class CitySearchService {
  private readonly httpClient: HttpClient = inject(HttpClient)
  constructor() { }

  searchCity(cityName: string): Observable<Search[]> {
    return this.httpClient.get<any>(`${searchWeatherUrl}`, {
      params: {
        key: apiKey,
        q: cityName
      }
    })
  }
}
