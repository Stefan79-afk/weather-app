import { TestBed } from '@angular/core/testing';

import { UserLocationService } from './user-location.service';

describe('UserLocationService', () => {
  let service: UserLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserLocationService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should get the correct userlocation", async () => {
    debugger;
    const expectedLatitude = 20;
    const expectedLongitude = 20;

    const mockGeolocation = {
      getCurrentPosition: jasmine.createSpy('getCurrentPosition').and.callFake((success) => {
        success({
          coords: {
            latitude: expectedLatitude,
            longitude: expectedLongitude
          }
        });
      })
    }

    Object.defineProperty(navigator, 'geolocation', {
      value: mockGeolocation,
      configurable: true
    });

    const [actualLatitude, actualLongitude] = await service.getUserLocation();
    console.log(actualLatitude);
    console.log(actualLongitude);
    expect(actualLatitude).toBe(expectedLatitude);
    expect(actualLongitude).toBe(expectedLongitude);
  });
});
