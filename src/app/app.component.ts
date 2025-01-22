import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  latitude: number | null = null;
  longitude: number | null = null;
  private cachedLocation: { latitude: number, longitude: number } | null = null;

  ngOnInit() {
    this.getLocation(); // Automatically fetch and cache location on initialization
  }

  // Method to get location with caching
  getLocation() {
    if (this.cachedLocation) {
      // Use cached location if available
      console.log('Using cached location');
    } else {
      // If no cached location, fetch the location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.cachedLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }; // Cache location
        }, (error) => {
          console.error('Error getting location', error);
        });
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }
  }

  // Fetch location manually (if needed after initialization)
  fetchLocation() {
    this.getLocation();
    // After fetching, update latitude and longitude
    if (this.cachedLocation) {
      this.latitude = this.cachedLocation.latitude;
      this.longitude = this.cachedLocation.longitude;
    }
  }

  // Clear the cached location
  clearLocation() {
    // this.cachedLocation = null;
    this.latitude = null;
    this.longitude = null;
  }
}
