import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './Event.css'
import loader from '../Assests/loading-1.gif'


const Event = () => {


    const [city, setCity] = useState('new delhi');
    const [data, setData] = useState([]);

    const handleCityChange = (e) => {
        setCity(e.target.value)
    }

    const [loading, setLoading] = useState(true)

    console.log(city)
    const submitHandler = async () => {
        setLoading(true);
        const resu = await axios.post(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_API_KEY}`)

        setData(resu.data.list);
        setLoading(false);

    }

    useEffect(() => {
        submitHandler();
        setLoading(false);

    }, [])


    return (
        <div className='event'>
            <h2>For Event Planners and Travellers</h2>
            <div className='search-bar'>
                <p>Find the perfect venue for your event</p>
                <div className='select-search-city'>
                    <select name="city" id="city" onChange={(e) => handleCityChange(e)}>
                        <option value="delhi">New Delhi</option>
                        <option value="kanpur">Kanpur</option>
                        <option value="lucknow">Lucknow</option>
                        <option value="gorakhpur">Gorakhpur</option>
                        <option value="goa">Goa</option>
                        <option value="mumbai">Mumbai</option>
                        <option value="bangalore">Bangluru</option>
                        <option value="mohali">Mohali</option>
                        <option value="chennai">Chennai</option>
                        <option value="pune">Pune</option>
                        <option value="sonipat">Sonipat</option>
                        <option value="bahadurgarh">Bahadurgarh</option>
                        <option value="gurugram">Gurugram</option>
                    </select>
                    <button onClick={submitHandler}>Search</button>
                </div>
            </div>

            <div className='event-venue'>
                {
                    loading ? <img src={loader} alt="" /> :
                        data.map((item, index) => {
                            return (
                                <div key={index} className='event-venue-card'>

                                    <h3 className='event-date-time'>
                                        <h3>Date/Time</h3>
                                        <p>{item.dt_txt}</p>
                                    </h3>

                                    <h3>Temp {(item.main.temp - 273.15).toFixed(2)} °C</h3>
                                    <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt="" />
                                    <h3>{item.weather[0].description}</h3>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default Event
