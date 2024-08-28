import { Component, inject } from '@angular/core';

import { DatePipe } from '@angular/common';
import { UserLocationService } from '../user-location.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  date: Date = new Date();
  userLocationService: UserLocationService = inject(UserLocationService);

  ngOnInit(): void {
    this.userLocationService.getUserLocation()
    .then((position: number[]) => {
      const [latitude, longitude] = position;
      console.log(`Your latitude is ${latitude}`);
      console.log(`Your longitutde is ${longitude}`)
    })
    .catch( ( error: Error | GeolocationPositionError ) => {
      if(error instanceof GeolocationPositionError) {
        console.log(error.code);
      }

      console.log(error.message);
    });
  }
}
