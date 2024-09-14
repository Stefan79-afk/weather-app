import { TestBed } from '@angular/core/testing';

import { WeatherServiceService } from './weather-service.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Current } from './current';
import { mockCurrent } from './mockCurrent';

describe('WeatherServiceService', () => {
  let service: WeatherServiceService;
  let httpTesting: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
            provideHttpClient(),
            provideHttpClientTesting()
        ]
    });
    service = TestBed.inject(WeatherServiceService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return weather data', () => {
    const mockLatitude: number = 20;
    const mockLongitude: number = 20;
    const mockWeatherData: Current = mockCurrent;

    service.getWeatherForCoordonates(mockLatitude, mockLongitude).subscribe(data => {
        expect(data).toEqual(mockWeatherData);
    });
    
    const req = httpTesting.expectOne(request => 
        request.url.includes('current.json') && 
        request.params.get('q') === `${mockLatitude},${mockLongitude}`
    );
    
    expect(req.request.method).toEqual('GET');
    req.flush(mockWeatherData);
    httpTesting.verify();
  });
});
