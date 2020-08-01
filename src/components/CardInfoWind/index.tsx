import React, { useMemo } from 'react';

import { Container } from './styles';

interface IWind {
  degree: number | undefined;
  speed: number | undefined;
}

const CardInfoWind: React.FC<IWind> = ({ degree, speed }) => {
  const valueWindDirection = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];

  const windDirection = useMemo(() => {
    if (degree) {
      const valueConverted = Math.trunc(degree / 22.5 + 0.5);
      return valueWindDirection[valueConverted];
    }

    return '';
  }, [degree, valueWindDirection]);
  return (
    <Container>
      <h4>Wind Status</h4>

      <div>
        <span>{speed}</span>
        <span>km</span>
      </div>
      <span>Wind Direction: {windDirection}</span>
    </Container>
  );
};

export default CardInfoWind;
