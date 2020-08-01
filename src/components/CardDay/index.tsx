import React, { useMemo } from 'react';

import { format } from 'date-fns';

import { Container } from './styles';

interface ITemperature {
  temp_min: number;
  temp_max: number;
}

interface IWeather {
  description: string;
  icon: string;
  main: string;
}

interface IDay {
  dt: number;
  main: ITemperature;
  weather: IWeather[];
}

interface IRequest {
  day: IDay;
  type: string;
  selected: number;
  handleCardDay: () => void;
}

const CardDay: React.FC<IRequest> = ({
  day,
  type,
  selected,
  handleCardDay,
}) => {
  const dayWeek = useMemo(() => {
    // return new Date(day * 1000).getDate();
    return format(day.dt * 1000, 'iii');
  }, [day]);

  function convertToF(temp: number): number {
    return Math.trunc((temp * 9) / 5 - 459.67);
  }

  function convertToC(temp: number): number {
    return Math.trunc(temp - 273.15);
  }

  const tempMinimum = useMemo(() => {
    if (day.main.temp_min)
      if (type === 'celsius') return `${convertToC(day.main.temp_min)} °C`;
      else return `${convertToF(day.main.temp_min)} °F`;
    return '';
  }, [day.main.temp_min, type]);

  const tempMaximum = useMemo(() => {
    if (day.main.temp_max)
      if (type === 'celsius') return `${convertToC(day.main.temp_max)} °C`;
      else return `${convertToF(day.main.temp_max)} °F`;
    return '';
  }, [day.main.temp_max, type]);

  return (
    <Container
      selected={day.dt === selected}
      onClick={() => {
        handleCardDay();
      }}
    >
      <h2>{dayWeek}</h2>
      <img
        // src="https://image.flaticon.com/icons/svg/198/198113.svg"
        src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
        alt="icon"
        width="50"
      />

      <div>
        <span>{tempMinimum}</span>
        <span>{tempMaximum}</span>
      </div>
    </Container>
  );
};

export default CardDay;
