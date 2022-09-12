import * as React from 'react';
import {WeatherCard} from './index';
import renderer from 'react-test-renderer';

const mainMock = {
  temp: 32,
  feels_like: 30,
  temp_min: 31.83,
  temp_max: 31.83,
  pressure: 1011,
  humidity: 25,
  sea_level: 1011,
  grnd_level: 922,
};

const WeatherMock = {
  id: 802,
  main: 'Clouds',
  description: 'nuvens dispersas',
  icon: '03d',
};

const weatherMock = {
  main: {...mainMock},
  weather: {...WeatherMock},
};
console.log('weatherMock', weatherMock);

it('renders correctly', () => {
  const tree = renderer.create(
    <WeatherCard main={weatherMock.main} weather={weatherMock.weather}>
      test
    </WeatherCard>,
  );
  expect(tree).toMatchSnapshot();
});
