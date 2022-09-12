import axios from 'axios';
import {Coordinates} from 'src/types/Location';
import {WeatherGeneral} from 'src/types/Weather';

import {WEATHER_API_KEY} from '@env';

const BASE_API = 'https://api.openweathermap.org/data/2.5';

type CurrentWeatherResponse = {
  data: WeatherGeneral;
};

export default {
  getCurrentWeather: ({
    longitude,
    latitude,
  }: Coordinates): Promise<CurrentWeatherResponse> =>
    axios.get(
      `${BASE_API}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&lang=pt&units=metric`,
    ),
};
