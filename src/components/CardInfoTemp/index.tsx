import React, { useMemo } from 'react';

import { Container } from './styles';

interface ITemperature {
  tempActual: number | undefined;
  tempMin: number | undefined;
  tempMax: number | undefined;
  type: string;
}

const CardInfoTemp: React.FC<ITemperature> = ({
  tempActual,
  tempMax,
  tempMin,
  type,
}) => {
  function convertToF(temp: number): number {
    return Math.trunc((temp * 9) / 5 - 459.67);
  }

  function convertToC(temp: number): number {
    return Math.trunc(temp - 273.15);
  }

  const temp = useMemo(() => {
    if (tempActual)
      if (type === 'celsius') return `${convertToC(tempActual)} °C`;
      else return `${convertToF(tempActual)} °F`;
    return '';
  }, [tempActual, type]);

  const tempMinimum = useMemo(() => {
    if (tempMin)
      if (type === 'celsius') return `${convertToC(tempMin)} °C`;
      else return `${convertToF(tempMin)} °F`;
    return '';
  }, [tempMin, type]);

  const tempMaximum = useMemo(() => {
    if (tempMax)
      if (type === 'celsius') return `${convertToC(tempMax)} °C`;
      else return `${convertToF(tempMax)} °F`;
    return '';
  }, [tempMax, type]);

  return (
    <Container>
      <h4>Temperature</h4>
      <div>
        <span>Temp</span>
        <span>{temp}</span>
      </div>
      <div>
        <span>temp mim</span>
        <span>{tempMinimum}</span>
      </div>
      <div>
        <span>temp max</span>
        <span>{tempMaximum}</span>
      </div>
    </Container>
  );
};

export default CardInfoTemp;
