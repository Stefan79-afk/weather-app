import { Component, Input } from '@angular/core';
import { Current } from '../current';

@Component({
  selector: 'app-location-weather',
  standalone: true,
  imports: [],
  templateUrl: './location-weather.component.html',
  styleUrl: './location-weather.component.css'
})
export class LocataionWeatherComponent {
  @Input() weatherInfo!: Current
}
