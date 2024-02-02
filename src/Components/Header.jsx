import React, { useEffect } from 'react'
import { useState } from 'react'
// import './Header.css'
import './Header.css'

const Header = () => {
  const [data, setData] = useState({
    city_name: 'New Delhi',
    temp: '12',
    icon: '',
    wind: '3',
    humidity: '90',
  });

  const [lat, setLat] = useState(26);
  const [long, setLong] = useState(80);

  navigator.geolocation.getCurrentPosition(function (position) {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  });

  const fetchdata = async () => {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}`)
    const data = await res.json();

    // console.log(data)
    setData({
      city_name: data.name,
      country: data.sys.country,
      temp: (data.main.temp - 273.15).toFixed(2),
      icon: data.weather[0].icon,
      wind: data.wind.speed,
      humidity: data.main.humidity
    })

  }

  useEffect(() => {

    fetchdata()
  }
    , [lat, long])


  return (

    <div className='header'>
      <div className='left-div'>
        <img alt="icon" src={data.icon ? `http://openweathermap.org/img/w/${data.icon}.png` : ""} />
        <div className='location'>{data.city_name}, {data.country} </div>
      </div>
      <div className='right-div'>
        <h1 className='temp'> Temp  {data.temp} °C </h1>
        <div className='wind'>Wind  {data.wind} km/h </div>
        <div className='humidity'>Humidity  {data.humidity} % </div>

      </div>
    </div>
  )
}

export default Header
