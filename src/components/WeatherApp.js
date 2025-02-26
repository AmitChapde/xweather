import { useState } from "react";
import "./WeatherApp.css"; 

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "18fd3167c707432cb8c40013252602"; 

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app">
        <h1>Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {loading && <p>Loading data…</p>}

      {weather && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature: {weather.current.temp_c}°C</h3>
          </div>
          <div className="weather-card">
            <h3>Humidity: {weather.current.humidity}%</h3>
          </div>
          <div className="weather-card">
            <h3>Condition: {weather.current.condition.text}</h3>
          </div>
          <div className="weather-card">
            <h3>Wind Speed: {weather.current.wind_kph} km/h</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
