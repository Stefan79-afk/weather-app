import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLocationService {

  constructor() { }

  async getUserLocation(): Promise<number[]> {
    
    const promise = new Promise<any>((resolve, reject) => {
      if(!navigator.geolocation) {
        reject(new Error("Your browser does not support geolocation. Please try another one"));
      }
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => resolve([position.coords.latitude, position.coords.longitude]), 
        (error: GeolocationPositionError) => reject(error))
    });

    return promise;
  };
}

