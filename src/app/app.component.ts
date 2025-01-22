import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'locationStuff';
  latitude: number | null = null;
  longitude: number | null = null;

  // Method 1: Callback-based
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        // this.sendLocation(this.latitude, this.longitude);
      }, (error) => {
        console.error('Error getting location', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  // Method 2: Promise-based
  getCoordinate(): Promise<{ latitude: number; longitude: number }> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            this.latitude = latitude;
            this.longitude = longitude;
            resolve({ latitude, longitude });
          },
          (error) => {
            console.error('Error getting location: ', error);
            reject(error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        reject(new Error('Geolocation not supported'));
      }
    });
  }

  fetchAndSendLocation() {
    this.getCoordinate().then(coords => {
      // this.sendLocation(coords.latitude, coords.longitude);
      console.log(coords);
    }).catch(error => {
      console.error('Failed to get coordinates', error);
    });
  }

  // // Send location to API
  // sendLocation(lat: number, lon: number) {
  //   this.http.post('YOUR_API_ENDPOINT', { latitude: lat, longitude: lon })
  //     .subscribe(response => console.log('Location sent', response));
  // }
}
