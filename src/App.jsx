import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  WiDaySunny, WiNightClear, WiDayCloudy, WiNightAltCloudy,
  WiDayRainMix, WiNightAltRain, WiDayRainWind, WiNightAltRainWind,
  WiDayThunderstorm, WiNightAltThunderstorm, WiDaySnow, WiNightAltSnow,
  WiSnowWind, WiDayFog, WiNightFog, WiTornado, WiHurricane,
  WiDayWindy, WiNightAltCloudyGusts, WiHot, WiSnowflakeCold,
  WiDayHaze, // Added Haze icon
} from "react-icons/wi";
import { FaSearch, FaTint, FaWind, FaCloud, FaSmog, FaEye, FaThermometerHalf } from "react-icons/fa";
import { TbTemperatureCelsius } from "react-icons/tb";
import { MdOutlineDirections } from "react-icons/md";
const App = () => {
  const [city, setCity] = useState('New Delhi');
  const [weather, setWeather] = useState(null);
  const [searchCity, setSearchCity] = useState('');
  const API_KEY = 'a63ca14799860e61239e2f25fa9d210b';

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (cityName) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  const getWeatherIcon = (weatherType, isDay) => {
    const normalizedType = normalizeWeatherType(weatherType); // Normalize weather type
    const icons = isDay ? dayWeatherIcons : nightWeatherIcons;
  
    // Check if the normalized type exists in the icons array
    const matchedIcon = icons.find((icon) => icon.type === normalizedType);
    return matchedIcon ? matchedIcon.icon : <WiDaySunny />; // Default to sunny if no match
  };
  
  const normalizeWeatherType = (type) => {
    switch (type.toLowerCase()) {
      case 'clear':
        return 'sunny';
      case 'clouds':
        return 'cloudy';
      case 'rain':
        return 'light rain';
      case 'thunderstorm':
        return 'thunderstorm';
      case 'snow':
        return 'snow';
      case 'mist':
      case 'haze':
      case 'smoke':  
        return 'haze'; // Use fog icon for mist/haze
      case 'tornado':
        return 'tornado';
      case 'squall':
        return 'windy';
      default:
        return 'sunny'; // Default to sunny
    }
  };
  
  // Daytime Weather Icons
  const dayWeatherIcons = [
    { type: "sunny", icon: <WiDaySunny color='orange' /> },
    { type: "cloudy", icon: <WiDayCloudy color='black' /> },
    { type: "light rain", icon: <WiDayRainMix color='blue' /> },
    { type: "heavy rain", icon: <WiDayRainWind color='blue' /> },
    { type: "thunderstorm", icon: <WiDayThunderstorm color='yellow' /> },
    { type: "snow", icon: <WiDaySnow  color='white'/> },
    { type: "blizzard", icon: <WiSnowWind color='white' /> },
    { type: "fog", icon: <WiDayFog color='white' /> },
    { type: "tornado", icon: <WiTornado color='black' /> },
    { type: "hurricane", icon: <WiHurricane color='black' /> },
    { type: "windy", icon: <WiDayWindy color='black' /> },
    { type: "hot", icon: <WiHot color='orange' /> },
    { type: "cold", icon: <WiSnowflakeCold /> },
    { type: "haze", icon: <WiDayHaze color='black' /> }, // Added Haze icon
  ];
  
  // Nighttime Weather Icons
  const nightWeatherIcons = [
    { type: "sunny", icon: <WiNightClear color='black' /> },
    { type: "cloudy", icon: <WiNightAltCloudy color='black' /> },
    { type: "light rain", icon: <WiNightAltRain color='blue'  /> },
    { type: "heavy rain", icon: <WiNightAltRainWind color='blue'  /> },
    { type: "thunderstorm", icon: <WiNightAltThunderstorm color='yellow' /> },
    { type: "snow", icon: <WiNightAltSnow  color='black'/> },
    { type: "blizzard", icon: <WiSnowWind color='black' /> },
    { type: "fog", icon: <WiNightFog  color='black'/> },
    { type: "tornado", icon: <WiTornado color='black' /> },
    { type: "hurricane", icon: <WiHurricane  color='black'/> },
    { type: "windy", icon: <WiNightAltCloudyGusts /> },
    { type: "hot", icon: <WiHot color='orange' /> },
    { type: "cold", icon: <WiSnowflakeCold  color='black'/> },
    { type: "haze", icon: <WiNightFog  color='black'/> }, // Added Haze icon
  ];

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

  if (!weather) return <div className="loading">Loading...</div>;

  const { name, sys, main, weather: weatherDetails, wind, clouds, visibility } = weather;
  const weatherType = weatherDetails[0].main.toLowerCase();
  const description = weatherDetails[0].description;
  const icon = weatherDetails[0].icon;
  const date = new Date();
  const day = date.toLocaleDateString(undefined, { weekday: 'long' });
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const isDay = icon.includes('d'); // Check if it's daytime based on the icon code
  const feelsLike = main.feels_like;
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const windDirection = wind.deg;
  const cloudiness = clouds.all;
  const AQI = Math.floor(Math.random() * 201); // Simulated AQI value

  return (
    <div className="app">
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
      <div className="weather-container">
        <div className='main_info'>
          <div className="location_temp">
            <p>{name}, {sys.country}</p>
            <span className='icon'>{getWeatherIcon(weatherType, isDay)}</span>
          </div>
          <div className="temperature">
            <div className="weather-icon_disp">
              <span className='temprarure'>{Math.round(main.temp)}<TbTemperatureCelsius /></span>
              <span className='discription'>{description.charAt(0).toUpperCase() + description.slice(1)}</span>
            </div>
          </div>
          <div className="date-time">
            <p>{day}, {formattedDate} | {formattedTime}</p>
          </div>
        </div>
        <div className="weather-info">
          <div className="weather-item">
            <p><FaThermometerHalf size={25} color='silver' /> Feels Like:</p>
            <p>{Math.round(feelsLike)}°C</p>
          </div>
          <div className="weather-item">
            <p><FaTint size={20}  color='blue'/> Humidity:</p>
            <p>{humidity}%</p>
          </div>
          <div className="weather-item">
            <p><FaWind size={20} /> Wind Speed:</p>
            <p>{windSpeed} m/s</p>
          </div>
          <div className="weather-item">
            <p><MdOutlineDirections size={20} color='greenyellow'/> Wind Direction:</p>
            <p>{getWindDirection(windDirection)} ({windDirection}°)</p>
          </div>
          <div className="weather-item">
            <p><FaCloud size={20}  color="gray"/> Cloudiness:</p>
            <p>{cloudiness}%</p>
          </div>
          <div className="weather-item">
            <p><FaSmog size={20} c /> Air Quality Index (AQI):</p>
            <p>{AQI}</p>
          </div>
          <div className="weather-item">
            <p><FaEye size={20} color='black' /> Visibility Distance:</p>
            <p>{visibility / 1000} km</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;