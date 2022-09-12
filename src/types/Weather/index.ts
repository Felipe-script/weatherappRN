enum MainTypes {
  THUNDERSTORM = 'Thunderstorm',
  DRIZZLE = 'Drizzle',
  RAIN = 'Rain',
  SNOW = 'Snow',
  CLEAR = 'Clear',
  CLOUDS = 'Clouds',
}
export type WeatherGeneral = {
  weather: Weather[];
  main: {
    feels_like: number;
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
};

export type Weather = {
  id: number;
  description: string;
  icon: string;
  main: MainTypes;
};
