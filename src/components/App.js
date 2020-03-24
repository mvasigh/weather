import React from 'react';
import { LocationInput, CurrentWeather, DailyForecast } from 'components';
import useWeather from 'util/useWeather';
import './App.scss';

function App() {
  const [location, setLocation] = React.useState('Los Angeles');
  const { weather, loading, error } = useWeather(location);

  const handleSubmit = (location) => {
    setLocation(location);
  };

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
    });
  }, []);

  return (
    <main className="App">
      <LocationInput onSubmit={handleSubmit} />
      {!loading && weather && (
        <>
          <CurrentWeather
            city={weather.current.name}
            conditions={weather.current.weather[0]}
            tempData={weather.current.main}
            timezone={weather.current.timezone}
          />
          <DailyForecast forecastData={weather.forecast.list} />
        </>
      )}
      {error && <p className="App__error">{error}</p>}
    </main>
  );
}

export default App;
