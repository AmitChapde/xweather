import React, { useState } from "react";
import styles from "./WeatherApp.module.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=18fd3167c707432cb8c40013252602&q=${city}`
      );
      
      if (!response.ok) {
        throw new Error("Invalid city");
      }

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      alert("Failed to fetch weather data");
    }

    setLoading(false);
  };

  return (
    <div className={styles.weatherApp}>
      <h1>Weather App</h1>
      <input
        type="text"
        className={styles.inputField}
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className={styles.searchButton} onClick={fetchWeather}>
        Search
      </button>

      {loading && <p className={styles.loading}>Loading data…</p>}

      {weather && (
        <div className={styles["weather-cards"]}>
          <div className={styles["weather-card"]}>
            <h3>Temperature</h3>
            <p>{weather.current.temp_c}°C</p>
          </div>
          <div className={styles["weather-card"]}>
            <h3>Humidity</h3>
            <p>{weather.current.humidity}%</p>
          </div>
          <div className={styles["weather-card"]}>
            <h3>Condition</h3>
            <p>{weather.current.condition.text}</p>
          </div>
          <div className={styles["weather-card"]}>
            <h3>Wind Speed</h3>
            <p>{weather.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
