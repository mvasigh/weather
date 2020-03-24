import React from 'react';
import PropTypes from 'prop-types';
import './LocationInput.scss';

const LocationInput = ({ onSubmit = () => {} }) => {
  const [location, setLocation] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(location);
    setLocation('');
  };

  return (
    <form onSubmit={handleSubmit} className="LocationInput__form">
      <input
        placeholder="e.g. San Francisco"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="LocationInput__input"
        type="text"
        autoFocus
      />
    </form>
  );
};

LocationInput.propTypes = {
  onSubmit: PropTypes.func,
};

export default LocationInput;
