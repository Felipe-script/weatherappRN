import styled from 'styled-components/native';

export const WeatherCard = styled.View`
  width: 300px;
  height: 300px;
  background-color: #34495e;
  padding: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin: 20px auto;
`;

export const WeatherTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ffffff;
`;

export const WeatherCurrentTemperature = styled.Text`
  font-size: 16px;
  color: #ecf0f1;
`;

export const WeatherIcon = styled.Image`
  width: 100px;
  height: 100px;
  align-self: center;
  margin-top: 30px;
`;

export const WeatherContentDegress = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 16px;
`;

export const WeatherSubtext = styled.Text`
  font-size: 14px;
  color: #bdc3e7;
`;
