import React from 'react';
import { TbTemperatureCelsius } from "react-icons/tb";

const Left = ({ weather }) => {
  const bgs = [
    { type: "Clouds", link: "https://images.pexels.com/photos/19670/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400" },
    { type: "Clear", link: "https://images.pexels.com/photos/355508/pexels-photo-355508.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { type: "Rain", link: "https://images.pexels.com/photos/396547/pexels-photo-396547.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { type: "Haze", link: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { type: "Wind", link: "https://images.pexels.com/photos/6510369/pexels-photo-6510369.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { type: "Snow", link: "https://images.pexels.com/photos/7245519/pexels-photo-7245519.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { type: "Thunderstorm", link: "https://images.pexels.com/photos/6510369/pexels-photo-6510369.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { type: "Fog", link: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=400" },
    { type: "default", link: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=400" }
  ];

  if (!weather) return <div>Loading...</div>;  

  const { name, sys, main, weather: weatherDetails } = weather;
  const weatherType = weatherDetails[0].main;  // Example: "Clouds", "Clear", etc.

  // Find matching background or fallback to default
  const bgImage = bgs.find(bg => bg.type === weatherType)?.link || bgs.find(bg => bg.type === "default").link;

  const date = new Date();
  const day = date.toLocaleDateString(undefined, { weekday: 'long' }); // Get day (Sunday, Monday, etc.)
  const formattedDate = date.toLocaleDateString(); // Get full date
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className='left_inner' style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className='top_right'>
        <p style={{fontSize:"2rem"}}>{name}, {sys.country}</p>
      </div>
      <div className='bottom'>
        <p>{day}, {formattedDate} | {formattedTime}</p>
        <h2>{Math.round(main.temp)}<TbTemperatureCelsius />
        </h2>
      </div>
    </div>
  );
};

export default Left;
