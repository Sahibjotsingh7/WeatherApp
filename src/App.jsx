import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Left from './Left';
import Right from './Right';

const App = () => {
  const [city, setCity] = useState('New Delhi');
  const [weather, setWeather] = useState(null);
  const API_KEY = 'a63ca14799860e61239e2f25fa9d210b';

  const  mainBG = [
      {
        time:"night",
        link:"https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg?auto=compress&cs=tinysrgb&w=400"
      },{
        time:"day",
        link:"https://images.pexels.com/photos/3783385/pexels-photo-3783385.jpeg?auto=compress&cs=tinysrgb&w=400"
      }
  ]

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const fetchWeather = async (cityName) => {
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
      setWeather(res.data);
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  return (
    <div className="app">
      {weather ? (
        <>
          <Left weather={weather} />
          <Right weather={weather} setCity={setCity} />
        </>
      ) : (
        <div>Loading weather data...</div>
      )}
    </div>
  );
};

export default App;
