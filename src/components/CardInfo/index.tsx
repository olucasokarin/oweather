import React from 'react';

import { Container } from './styles';

interface IWeather {
  title: string;
  value: number | undefined;
  type: string;
}

const CardInfoTemp: React.FC<IWeather> = ({ title, value, type }) => {
  return (
    <Container>
      <h4>{title}</h4>

      <div>
        <span>{value}</span>
        <span>{type}</span>
      </div>
    </Container>
  );
};

export default CardInfoTemp;
