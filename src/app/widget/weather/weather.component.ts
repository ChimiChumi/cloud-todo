// weather.component.ts
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { faLocationDot, faMagnifyingGlass, faWind, faWater } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})

export class WeatherComponent {
  locIcon = faLocationDot;
  searchIcon = faMagnifyingGlass;
  windIcon = faWind;
  waterIcon = faWater;

  apiKey: string = '0f7ab7afaf3f492b35c995b49ced192d';
  weatherData: any;
  city: string = "Szeged";
  isError: boolean = false;

  checkCity(): void {
    if (this.city.trim() === '') {
      this.city = 'Szeged';
    }

    this.getWeatherData(this.apiKey,this.city);
  }

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getWeatherData('0f7ab7afaf3f492b35c995b49ced192d', 'szeged');
  }

  getWeatherData(apiKey: string, city: string): void {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    this.http.get(apiUrl).subscribe(
      (response: any) => {
        this.weatherData = response;
      },
      (error) => {
        this.isError = true;
        console.error('Error fetching weather data:', error);
      }
    );
  }

  getWeatherIcon(main: string): string {
    switch (main) {
      case 'Clear':
        return '../../assets/images/clear.png';
      case 'Rain':
        return '../../assets/images/rain.png';
      case 'Snow':
        return '../../assets/images/snow.png';
      case 'Clouds':
        return '../../assets/images/cloudy.png';
      case 'Haze':
        return '../../assets/images/mist.png';
      default:
        return '';
    }
  }
}
