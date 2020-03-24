import React from 'react';
import PropTypes from 'prop-types';
import { format, addMilliseconds } from 'date-fns';
import WeatherIcon from 'react-icons-weather';
import { toF, toC } from 'util/temperature';
import './CurrentWeather.scss';

const getDateTime = (timezone) => {
  const date = new Date();
  const adjustedDate = addMilliseconds(
    new Date(),
    timezone * 1000 + date.getTimezoneOffset() * 60 * 1000
  );
  return format(adjustedDate, 'iiii, K:mm b');
};

const CurrentWeather = ({ city, timezone, tempData, conditions, isFahrenheit = false }) => {
  const dateTime = getDateTime(timezone);

  const tempFormatter = isFahrenheit ? toF : toC;
  const unit = isFahrenheit ? 'F' : 'C';

  return (
    <div className="CurrentWeather">
      <h2 className="CurrentWeather__city">{city}</h2>
      <p className="CurrentWeather__description">
        {dateTime}
        <br />
        {conditions.main}
      </p>
      <div className="CurrentWeather__temp-container">
        <WeatherIcon className="CurrentWeather__icon" name="owm" iconId={String(conditions.id)} />
        <span className="CurrentWeather__temp">
          {tempFormatter(tempData.temp).toFixed(1)}&deg; {unit}
        </span>
      </div>
    </div>
  );
};

CurrentWeather.propTypes = {
  city: PropTypes.string,
};

export default CurrentWeather;
