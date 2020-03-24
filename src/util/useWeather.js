import React from 'react';
import api from 'util/ApiClient';

function useWeather(location) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [weather, setWeather] = React.useState(null);

  React.useEffect(() => {
    if (!location) return;
    const _location = location;
    let query = {};
    if (typeof _location === 'string') {
      query.q = _location;
    } else {
      query.lat = _location.lat;
      query.lon = _location.lon;
    }
    setLoading(true);
    setWeather(null);
    setError(null);
    Promise.all([api.currentWeather(query), api.forecast(query)])
      .then(([current, forecast]) => {
        if (current.cod === '404' || forecast.cod === '404') {
          throw new Error('Could not find city. Please try again.')
        }
        setLoading(false);
        setWeather({ current, forecast });
      })
      .catch((e) => {
        setLoading(false);
        setWeather(null);
        setError(e?.message ?? 'Unknown error occured');
      });
  }, [location]);

  return { loading, error, weather };
}

export default useWeather;
