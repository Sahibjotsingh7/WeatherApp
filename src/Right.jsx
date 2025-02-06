import React, { useState } from 'react';
import { FaSearch, FaWind, FaCloud, FaTint, FaSmog, FaEye } from 'react-icons/fa';
import { WiThermometer } from 'react-icons/wi';

const Right = ({ weather, setCity }) => {
  const [searchCity, setSearchCity] = useState('');

  if (!weather) return <div className="loading">Loading...</div>;

  const { weather: weatherDetails, main, wind, clouds, visibility } = weather;
  const description = weatherDetails[0].description;
  const icon = weatherDetails[0].icon;
  const feelsLike = main.feels_like;
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const windDirection = wind.deg;
  const cloudiness = clouds.all;

  // Simulating AQI value (if it's not available in the API response)
  const AQI = Math.floor(Math.random() * 201); // Generates a random AQI between 0 and 200

  // Convert wind direction from degrees to compass direction
  const getWindDirection = (deg) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      setCity(searchCity);
      setSearchCity('');
    }
  };

  return (
    <div className="right_inner">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="search-bar">
        <input 
          type="text" 
          placeholder="Search city..." 
          value={searchCity} 
          onChange={(e) => setSearchCity(e.target.value)} 
          className="search-input"
        />
        <button type="submit" className="search-button">
          <FaSearch size={20} />
        </button>
      </form>

      {/* Weather Details */}
      <div className="weather-info">
        <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt={description} className="weather-icon" />
        <h1 className="weather-description" style={{marginBottom:"30px" , fontSize:"3rem"}}>{description}</h1>
        <div className="weather-info-inner">
  <div className="weather-item">
    <p><WiThermometer size={25} /> <strong>Feels Like:</strong></p>
    <p>{Math.round(feelsLike)}°C</p>
  </div>

  <div className="weather-item">
    <p><FaTint size={20} /> <strong>Humidity:</strong></p>
    <p>{humidity}%</p>
  </div>

  <div className="weather-item">
    <p><FaWind size={20} /> <strong>Wind Speed:</strong></p>
    <p>{windSpeed} m/s</p>
  </div>

  <div className="weather-item">
    <p><FaWind size={20} /> <strong>Wind Direction:</strong></p>
    <p>{getWindDirection(windDirection)} ({windDirection}°)</p>
  </div>

  <div className="weather-item">
    <p><FaCloud size={20} /> <strong>Cloudiness:</strong></p>
    <p>{cloudiness}%</p>
  </div>

  <div className="weather-item">
    <p><FaSmog size={20} /> <strong>Air Quality Index (AQI):</strong></p>
    <p>{AQI}</p>
  </div>

  <div className="weather-item">
    <p><FaEye size={20} /> <strong>Visibility Distance:</strong></p>
    <p>{visibility / 1000} km</p>
  </div>
</div>

      </div>
    </div>
  );
};

export default Right;
