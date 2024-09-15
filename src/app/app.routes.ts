import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CityWeatherComponent } from './city-weather/city-weather.component';

export const routes: Routes = [
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    },
    {
        path: 'city/:cityName',
        component: CityWeatherComponent
    }
];
