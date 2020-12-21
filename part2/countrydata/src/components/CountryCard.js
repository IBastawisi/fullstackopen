import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const CountryCard = ({ country }) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [isShown, setShown] = useState(false)
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        if (isShown) {
            axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
                .then(response => {
                    setWeather(response.data)
                })
        }
    }, [isShown])
    return <div className="country-card">
        <span>{country.name}</span>
        <button onClick={() => setShown(!isShown)}>{isShown ? 'hide' : 'show'}</button>
        {isShown && <div>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <h3>Spoken languades</h3>
            <ul>{country.languages.map(l => <li key={l.iso639_1}>{l.name}</li>)}</ul>
            <img src={country.flag} alt="flag" style={{ width: 128 }}></img>
            {weather?.current && <div><h3>Weather in {country.capital}</h3>
                <div>
                    <p>temprature: {weather.current.temperature}°</p>
                    <img src={weather.current.weather_icons[0]} alt="weather icon" style={{ width: 128 }}></img>
                    <p>wind: {weather.current.wind_speed}Km/Hour {weather.current.wind_dir}</p>
                </div>
            </div>}
        </div>
        }
    </div>
}