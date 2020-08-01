import React, { useMemo } from 'react';

import { format, isToday } from 'date-fns';

import sunrise from '../../assets/sunrise.png';
import sunset from '../../assets/sunset.png';

import { Container } from './styles';

interface ISun {
  sunriseHour: number | undefined;
  sunsetHour: number | undefined;
  day: number | undefined;
}

const CardInfoSunStatus: React.FC<ISun> = ({
  sunriseHour,
  sunsetHour,
  day,
}) => {
  const sunriseMemo = useMemo(() => {
    if (sunriseHour) {
      const date = new Date(sunriseHour * 1000);
      // return `${date.getHours()}:${date.getMinutes()}`;
      return format(date, `H':'m`);
    }
    return '';
  }, [sunriseHour]);

  const sunsetMemo = useMemo(() => {
    if (sunsetHour) {
      const date = new Date(sunsetHour * 1000);
      // return `${date.getHours()}:${date.getMinutes()}`;
      return format(date, `H':'m`);
    }
    return '';
  }, [sunsetHour]);

  return (
    <Container>
      <h4>Sunrise & Sunset</h4>

      {(day && isToday(day * 1000) && (
        <>
          <div>
            <img src={sunrise} alt="sunrise" />
            <span>{sunriseMemo}</span>
          </div>
          <div>
            <img src={sunset} alt="sunset" />
            <span>{sunsetMemo}</span>
          </div>
        </>
      )) || <span>no data for this day</span>}
    </Container>
  );
};

export default CardInfoSunStatus;
