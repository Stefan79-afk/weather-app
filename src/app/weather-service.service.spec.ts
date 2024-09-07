import { TestBed } from '@angular/core/testing';

import { WeatherServiceService } from './weather-service.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Current } from './current';

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
    const mockWeatherData: Current = {
        location: {
          name: 'Test City',
          region: 'Test Region',
          country: 'Test Country',
          lat: mockLatitude,
          lon: mockLongitude,
          tz_id: 'Test/Timezone',
          localtime_epoch: 1234567890,
          localtime: '2023-01-01 12:00'
        },
        current: {
          temp_c: 25,
          temp_f: 79,
          is_day: 1,
          last_updated: "now",
          last_updated_epoch: 12412541251,
          condition: {
            text: 'Sunny',
            icon: 'sunny.png',
            code: 1000
          },

         wind_mph: 12,
         wind_kph: 6,
         wind_degree: 12,
         wind_dir: "south",
         pressure_mb: 1,
         pressure_in: 1,
         precip_mm: 1,
         precip_in: 1,
         humidity: 12,
         cloud: 2,
         feelslike_c: 24,
         feelslike_f: 78,
         windchill_c: 3,
         windchill_f: 3,
         heatindex_c: 3,
         heatindex_f: 12,
         dewpoint_c: 12,
         dewpoint_f: 12,
         vis_km: 12,
         vis_miles: 12,
         uv: 12,
         gust_mph: 12,
         gust_kph: 12,
        }
    };

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
