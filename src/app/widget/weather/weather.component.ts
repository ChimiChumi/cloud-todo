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

  apiKey: string = '0f7ab7afaf3f492b35c995b49ced192d';  //trial, demo purposes
  weatherData: any;
  city: string = "Szeged";
  isError: boolean = false;

  // set the default city to my town if left empty
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


  /**
   * This function fetches the current weather based on the parameters.
   * @param apiKey OpenWeatherMap personal API
   * @param city  entered location
   */
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

  // loads the icon corresponding with the current weather
  getWeatherIcon(main: string): string {
    switch (main) {
      case 'Clear':
        return '../../assets/images/clear.png';
      case 'Clouds':
        return '../../assets/images/cloudy.png';
      case 'Thunderstorm':
        return '../../assets/images/thunderstorm.png';
      case 'Rain':
        return '../../assets/images/rain.png';
      case 'Drizzle':
        return '../../assets/images/rain.png';
      case 'Fog':
        return '../../assets/images/fog.png';
      case 'Mist':
        return '../../assets/images/fog.png';
      case 'Snow':
        return '../../assets/images/snow.png';
      default:
        return '';
    }
  }
}
