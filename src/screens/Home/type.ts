export type CurrentWeather = {
  coord: {
    lon: 31.2353;
    lat: 30.0443;
  };
  weather: [
    {
      id: 802;
      main: "Clouds";
      description: "scattered clouds";
      icon: "03n";
    }
  ];
  base: "stations";
  main: {
    temp: 15;
    feels_like: 13.53;
    temp_min: 15;
    temp_max: 15;
    pressure: 1022;
    humidity: 77;
  };
  visibility: 10000;
  wind: {
    speed: 2.57;
    deg: 330;
  };
  clouds: {
    all: 40;
  };
  dt: 1612560813;
  sys: {
    type: 1;
    id: 2514;
    country: "EG";
    sunrise: 1612500176;
    sunset: 1612539313;
  };
  timezone: 7200;
  id: 7922173;
  name: "Al ‘Atabah";
  cod: 200;
};

export type CityDetailsType = {
  currentTemp: number;
  maxTemp: number;
  minTemp: number;
  status: string;
  icon: string;
};
