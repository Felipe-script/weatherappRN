import React, {useCallback, useEffect, useState} from 'react';
import {StatusBar, ActivityIndicator} from 'react-native';

import Geocoder from 'react-native-geocoding';
import {GOOGLE_API_KEY} from '@env';

import {Weather, WeatherGeneral} from 'src/types/Weather';
import {WeatherCard} from 'src/components';
import {useCurrentLocation} from 'src/hooks';
import weatherService from 'src/services/weather/index';
import * as S from './styles';

Geocoder.init(GOOGLE_API_KEY);

type WeatherCurrentType = Omit<WeatherGeneral, 'weather'> & {
  weather: Weather;
};

const Home: React.FC = () => {
  const [state, setState] = useState<WeatherCurrentType>();
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {myCoords, updateLocation} = useCurrentLocation();

  useEffect(() => {
    if (!myCoords) {
      return;
    }
    const getWeather = async (): Promise<void> => {
      setLoading(true);
      await setReverseGeolocation();
      try {
        const {data} = await weatherService.getCurrentWeather(myCoords);
        const [weather] = data.weather;
        const weatherResponse = {
          ...data,
          main: {
            ...data.main,
            temp: Math.round(data.main.temp),
            feels_like: Math.round(data.main.feels_like),
          },
          weather,
        } as WeatherCurrentType;
        setState(weatherResponse);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myCoords]);

  const setReverseGeolocation = useCallback(async (): Promise<void> => {
    if (myCoords) {
      try {
        const {results} = await Geocoder.from({
          latitude: myCoords.latitude,
          longitude: myCoords.longitude,
        });
        setAddress(results[0].formatted_address);
      } catch (error) {
        setAddress(null);
      }
    }
  }, [myCoords]);

  return (
    <S.Container>
      <StatusBar barStyle={'dark-content'} />

      {state && address && !loading ? (
        <>
          <S.PrimaryText>{address}</S.PrimaryText>
          <WeatherCard main={state.main} weather={state.weather} />
          <S.Button
            onPress={() => updateLocation()}
            title="Atualizar"
            color="#09ff"
          />
        </>
      ) : (
        <ActivityIndicator />
      )}
    </S.Container>
  );
};

export default Home;
