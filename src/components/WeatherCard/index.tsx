import React from 'react';

import {Weather, WeatherGeneral} from 'src/types/Weather';
import * as S from './styles';

const BASE_ICON_URL = 'https://openweathermap.org/img/wn';

type WeatherCurrentType = Omit<WeatherGeneral, 'weather'> & {
  weather: Weather;
};

export const WeatherCard: React.FC<WeatherCurrentType> = ({main, weather}) => {
  console.log({main, weather});
  return (
    <S.WeatherCard>
      <S.WeatherTitle>{weather.description}</S.WeatherTitle>
      <S.WeatherCurrentTemperature>
        {`agora: ${main.temp} ℃`}
      </S.WeatherCurrentTemperature>
      <S.WeatherIcon
        source={{
          uri: `${BASE_ICON_URL}/${weather.icon}@4x.png`,
        }}
      />
      <S.WeatherContentDegress>
        <S.WeatherSubtext>humidade: {main.humidity}%</S.WeatherSubtext>
        <S.WeatherSubtext>sensação: {main.feels_like}℃</S.WeatherSubtext>
      </S.WeatherContentDegress>
    </S.WeatherCard>
  );
};

export default WeatherCard;
