import React from 'react';
import WeatherIcon from 'react-icons-weather';
import { toF, toC } from 'util/temperature';
import { WEEKDAYS } from 'shared/constants';
import './DailyForecast.scss';

const filterForecastData = (forecastData) => {
  const midnight = '00:00:00';

  let today = new Date().getDay(); // ! not accounting for time zones here
  const dailyForecastData = [];
  for (let i = 0; i < forecastData.length; i++) {
    if (i === 0 || forecastData[i].dt_txt.includes(midnight)) {
      const forecast = forecastData[i];
      const weekday = WEEKDAYS[today % 7].slice(0, 3);
      dailyForecastData.push({ ...forecast, weekday });
      today += 1;
    }
  }

  return dailyForecastData.slice(0, 4);
};

const DailyForecastCard = ({ forecast, isFahrenheit = false }) => {
  const conditionCode = forecast.weather[0].id;

  const tempFormatter = isFahrenheit ? toF : toC;
  const unit = isFahrenheit ? 'F' : 'C';

  return (
    <div className="DailyForecast__card">
      <span className="DailyForecast__card-weekday">{forecast.weekday}</span>
      <WeatherIcon className="DailyForecast__card-icon" name="owm" iconId={String(conditionCode)} />
      <span className="DailyForecast__card-temp">
        {tempFormatter(forecast.main.temp).toFixed(1)}&deg; {unit}
      </span>
    </div>
  );
};

const DailyForecast = ({ forecastData, isFahrenheit = false }) => {
  const data = filterForecastData(forecastData);

  return (
    <div className="DailyForecast">
      {data.map((data, i) => (
        <DailyForecastCard isFahrenheit={isFahrenheit} forecast={data} key={i} />
      ))}
    </div>
  );
};

export default DailyForecast;
