export interface OneCallType {
  lat: 33.44;
  lon: -94.04;
  timezone: "America/Chicago";
  timezone_offset: -21600;
  current: {
    dt: 1595243443;
    sunrise: 1608124431;
    sunset: 1608160224;
    temp: 274.75;
    feels_like: 270.4;
    pressure: 1017;
    humidity: 96;
    dew_point: 274.18;
    uvi: 0;
    clouds: 90;
    visibility: 6437;
    wind_speed: 3.6;
    wind_deg: 320;
    weather: [
      {
        id: 701;
        main: "Mist";
        description: "mist";
        icon: "50n";
      }
    ];
  };
  minutely: [
    {
      dt: 1595243460;
      precipitation: 0;
    }
  ];
  hourly: [
    {
      dt: 1595242800;
      temp: 274.75;
      feels_like: 271.22;
      pressure: 1017;
      humidity: 96;
      dew_point: 274.18;
      uvi: 0;
      clouds: 90;
      visibility: 1765;
      wind_speed: 2.43;
      wind_deg: 303;
      weather: [
        {
          id: 804;
          main: "Clouds";
          description: "overcast clouds";
          icon: "04n";
        }
      ];
      pop: 0.1;
    }
  ];
  daily: [
    {
      dt: 1595268000;
      sunrise: 1608124431;
      sunset: 1608160224;
      temp: {
        day: 278.14;
        min: 273.15;
        max: 279.4;
        night: 273.15;
        eve: 275.82;
        morn: 275.35;
      };
      feels_like: {
        day: 273.53;
        night: 270.26;
        eve: 271.89;
        morn: 272.11;
      };
      pressure: 1021;
      humidity: 70;
      dew_point: 273.27;
      wind_speed: 3.74;
      wind_deg: 323;
      weather: [
        {
          id: 803;
          main: "Clouds";
          description: "broken clouds";
          icon: "04d";
        }
      ];
      clouds: 60;
      pop: 0.84;
      uvi: 2.41;
    }
  ];
  alerts: [
    {
      sender_name: "NWS Tulsa (Eastern Oklahoma)";
      event: "Heat Advisory";
      start: 1597341600;
      end: 1597366800;
      description: "...HEAT ADVISORY REMAINS IN EFFECT FROM 1 PM THIS AFTERNOON TO\n8 PM CDT THIS EVENING...\n* WHAT...Heat index values of 105 to 109 degrees expected.\n* WHERE...Creek, Okfuskee, Okmulgee, McIntosh, Pittsburg,\nLatimer, Pushmataha, and Choctaw Counties.\n* WHEN...From 1 PM to 8 PM CDT Thursday.\n* IMPACTS...The combination of hot temperatures and high\nhumidity will combine to create a dangerous situation in which\nheat illnesses are possible.";
    }
  ];
}
