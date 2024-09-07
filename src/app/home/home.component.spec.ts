import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

import { formatDate } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let componentElement:HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

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
});
