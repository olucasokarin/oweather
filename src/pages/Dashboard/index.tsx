import React, { useState, useEffect, useCallback, useMemo } from 'react';

import { FiArrowRight } from 'react-icons/fi';
import { isToday, format } from 'date-fns';

import {
  Container,
  ContainerInfo,
  Info,
  ContainerListCity,
  ContainerCardsDay,
  ContainerCardInfo,
  NameInfo,
  Button,
} from './styles';

import CardDay from '../../components/CardDay';
import CardInfo from '../../components/CardInfo';
import CardInfoTemp from '../../components/CardInfoTemp';
import CardInfoWind from '../../components/CardInfoWind';
import CardInfoSunStatus from '../../components/CardInfoSunStatus';
import CardCity from '../../components/CardCity';
import api from '../../services/api';

interface IMainInfo {
  temp: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  pressure: number;
}

interface ICity {
  id: number;
  name: string;
  country: string;
  sunrise: number;
  sunset: number;
}

interface IWind {
  speed: number;
  deg: number;
}

interface IWeather {
  description: string;
  icon: string;
  main: string;
}

interface IDay {
  dt: number;
  main: IMainInfo;
  visibility: number;
  weather: IWeather[];
  wind: IWind;
  sunrise: number;
  sunset: number;
}

interface ICities {
  id: number;
  name: string;
  country: string;
}

const Dashboard: React.FC = () => {
  const [temperatureScale, setTemperatureScale] = useState('celsius');
  const [city, setCity] = useState<ICity>();
  const [day, setDay] = useState<IDay>();
  const [days, setDays] = useState<IDay[]>([]);

  const [citySelected, setCitySelected] = useState(0);
  const [daySelected, setDaySelected] = useState(0);

  const [cityInputSearch, setCityInputSearch] = useState('');
  const [citySearch, setCitySearch] = useState('');

  const [citySave, setCitySave] = useState<ICities[]>([]);

  useEffect(() => {
    const cities = localStorage.getItem('@oweather:cities');

    if (cities) {
      const citiesParsed = JSON.parse(cities);
      setCitySave(citiesParsed);
      setCitySearch(citiesParsed[0].name);
      setCitySelected(citiesParsed[0].id);
    }
  }, []);

  useEffect(() => {
    if (citySearch)
      api
        .get('', {
          params: {
            q: citySearch,
            appid: process.env.REACT_APP_APPID_SECRET,
          },
        })
        .then(response => {
          const { data } = response;
          const { list } = data;

          const dayz: IDay[] = list.filter((date: IDay, indice: number) => {
            const hour = new Date(date.dt * 1000).getHours();

            return indice === 0 || hour === 9;
          });

          const cityData = {
            id: data.city.id,
            name: data.city.name,
            country: data.city.country,
            sunrise: data.city.sunrise,
            sunset: data.city.sunset,
          };

          const { id, name, country } = cityData;
          setCity(cityData);
          setDay(dayz[0]);
          setDays(dayz);
          setDaySelected(dayz[0].dt);
          setCitySelected(id);

          const cities = citySave;

          const validate = cities.filter(
            item => item.name === name && item.country === country,
          );

          if (validate.length <= 0) {
            cities.push({ id, name, country });
            setCitySave([...cities]);

            localStorage.setItem('@oweather:cities', JSON.stringify(cities));
          }
        });
  }, [citySearch, citySave]);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      setCitySearch(cityInputSearch);
      setCityInputSearch('');
    },
    [cityInputSearch],
  );

  const citiesMemo = useMemo(() => {
    return citySave;
  }, [citySave]);

  const changeScale = useCallback((type: string) => {
    setTemperatureScale(type);
  }, []);

  const handleCardDay = useCallback((dayItem: IDay) => {
    setDaySelected(dayItem.dt);
    setDay(dayItem);
  }, []);

  const handleCardCity = useCallback((dayItem: ICities) => {
    const name = `${dayItem.name},${dayItem.country}`;

    setCitySearch(name);
    setCitySelected(dayItem.id);
  }, []);

  const handleDeleteCity = useCallback(
    (id: number) => {
      const cities = citySave;

      const citiesUpdated = cities.filter(item => item.id !== id);

      if (citiesUpdated.length > 0) {
        const name = `${citiesUpdated[0].name},${citiesUpdated[0].country}`;
        setCitySearch(name);
        setCitySelected(citiesUpdated[0].id);
        localStorage.setItem('@oweather:cities', JSON.stringify(citiesUpdated));
      } else {
        setCitySearch('');
        localStorage.removeItem('@oweather:cities');
      }

      setCitySave([...citiesUpdated]);
    },
    [citySave],
  );

  const selectedWeekDay = useMemo(() => {
    if (day) return format(day.dt * 1000, 'cccc');
    return '';
  }, [day]);

  return (
    <Container>
      <ContainerInfo>
        <Info>
          {(city && (
            <div>
              <h1>{`${city?.name}, ${city?.country}`}</h1>
              <span>{day?.weather[0].description}</span>
            </div>
          )) || <h1>Search city before</h1>}
          <div>
            <Button
              type="button"
              selected={temperatureScale === 'celsius'}
              onClick={() => changeScale('celsius')}
            >
              °C
            </Button>

            <Button
              type="button"
              selected={temperatureScale === 'farenheit'}
              onClick={() => changeScale('farenheit')}
            >
              °F
            </Button>
          </div>
        </Info>
        <ContainerCardsDay>
          {days.map(dayItem => (
            <CardDay
              key={dayItem.dt}
              day={dayItem}
              type={temperatureScale}
              selected={daySelected}
              handleCardDay={() => handleCardDay(dayItem)}
            />
          ))}
        </ContainerCardsDay>

        <NameInfo>
          {/* <h1>Today Hightlights</h1> */}
          {(day && isToday(day.dt * 1000) && <h1>Today&#39;s Highlights</h1>) ||
            (day && <h1>{selectedWeekDay}&apos;s Highlights</h1>)}
        </NameInfo>

        {day && (
          <ContainerCardInfo>
            <CardInfoTemp
              tempActual={day?.main.temp}
              tempMin={day?.main.temp_min}
              tempMax={day?.main.temp_max}
              type={temperatureScale}
            />
            <CardInfoWind speed={day?.wind.speed} degree={day?.wind.deg} />
            <CardInfoSunStatus
              sunriseHour={city?.sunrise}
              sunsetHour={city?.sunset}
              day={day?.dt}
            />

            <CardInfo title="Humidity" value={day?.main.humidity} type="%" />
            <CardInfo title="Pressure" value={day?.main.pressure} type="hPa" />
            <CardInfo title="Visibility" value={day?.visibility} type="m" />
          </ContainerCardInfo>
        )}
      </ContainerInfo>
      <ContainerListCity>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            value={cityInputSearch}
            onChange={e => setCityInputSearch(e.target.value)}
          />

          <button type="submit">
            <FiArrowRight />
          </button>
        </form>

        <h3>Registered Cities</h3>

        {citiesMemo &&
          citiesMemo.map(cityItem => (
            <CardCity
              key={cityItem.id}
              city={cityItem}
              selected={citySelected}
              handleCardCity={() => handleCardCity(cityItem)}
              handleDeleteCity={() => handleDeleteCity(cityItem.id)}
            />
          ))}
      </ContainerListCity>
    </Container>
  );
};

export default Dashboard;
