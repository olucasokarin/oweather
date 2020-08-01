import React from 'react';

import { FiTrash } from 'react-icons/fi';
import { Container } from './styles';

interface IRequest {
  city: ICityData;
  selected: number;
  handleCardCity: () => void;
  handleDeleteCity: () => void;
}
interface ICityData {
  id: number;
  name: string;
  country: string;
}
const CardCity: React.FC<IRequest> = ({
  city,
  selected,
  handleCardCity,
  handleDeleteCity,
}) => {
  return (
    <Container selected={city.id === selected}>
      <button
        type="button"
        onClick={() => {
          handleDeleteCity();
        }}
      >
        <FiTrash />
      </button>
      <span
        onClick={() => {
          handleCardCity();
        }}
      >
        {`${city.name}, ${city.country}`}
      </span>
    </Container>
  );
};

export default CardCity;
