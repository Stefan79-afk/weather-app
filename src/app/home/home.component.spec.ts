import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';

import { formatDate } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { mockCurrent } from '../mockCurrent';
import { Current } from '../current';
import { WeatherServiceService } from '../weather-service.service';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let componentElement:HTMLElement;
  let httpTestingController: HttpTestingController;
  let weatherService: WeatherServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        WeatherServiceService
      ]
    })
    .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    weatherService = TestBed.inject(WeatherServiceService);

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    componentElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have the correct title", () => {
    const mainTitle = componentElement.querySelector("h1");
    expect(mainTitle).toBeTruthy();
    expect(mainTitle?.tagName).toBe("H1");
    expect(mainTitle?.innerHTML).toEqual("Welcome");
  });

  it("should have the correct date title", () => {
    const dateTitle = componentElement.querySelector("h2");
    expect(dateTitle).toBeTruthy();
    expect(dateTitle?.tagName).toEqual("H2");
    expect(dateTitle?.innerHTML).toEqual(`Date: ${formatDate(new Date(), "fullDate", "en-US")}`);
  });

  // TODO: fix this test

  it("should have the correct location and temperature titles", fakeAsync(() => {
    const mockCurrentData: Current = mockCurrent;
    const mockLatitude = 20;
    const mockLongitude = 20;

    component.userLocationService.getUserLocation = jasmine.createSpy().and.resolveTo([mockLatitude, mockLongitude]);

    component.ngOnInit();
    tick();

    const req = httpTestingController.match(request => 
      request.url.includes("current.json") && 
      request.params.get("q") === `${mockLatitude},${mockLongitude}`
    );
    req[0].flush(mockCurrentData);

    tick();
    fixture.detectChanges();

    const h2Elements = componentElement.querySelectorAll('h2');
    const locationElement = h2Elements[1];
    const temperatureElement = h2Elements[2];

    expect(locationElement.textContent).toContain(`Location: ${mockCurrentData.location.name}`);
    expect(temperatureElement.textContent).toContain(`Temperature (Celsius): ${mockCurrentData.current.temp_c} degrees`);

    httpTestingController.verify();
  }));
});
