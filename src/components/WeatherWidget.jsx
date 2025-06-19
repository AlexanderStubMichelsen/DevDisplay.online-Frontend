import React, { useEffect, useState } from "react";
import "../css/WeatherWidget.css";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;


  // Try to load coordinates from sessionStorage or ask user for location
  useEffect(() => {
    const savedCoords = sessionStorage.getItem("coords");

    if (savedCoords) {
      setCoords(JSON.parse(savedCoords));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          sessionStorage.setItem("coords", JSON.stringify(userCoords));
          setCoords(userCoords);
        },
        (err) => {
          console.error(err);
          setError("🌍 Location access denied. Showing default or no weather.");
          setLoading(false);
        }
      );
    }
  }, []);

  // Fetch weather from API when coords are available
  useEffect(() => {
    if (!coords || !apiKey) return;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`
        );
        if (!res.ok) throw new Error("Weather fetch failed.");
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error(err);
        setError("☁️ Could not load weather.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [coords, apiKey]);

  return (
  <div className="weather-overlay">
    {loading && <div className="spinner">Loading...</div>}

    {!loading && error && <div className="error">{error}</div>}

    {!loading && weather && (
      <>
        <h4>Weather in {weather.name}</h4>
        <p>
          {Math.round(weather.main.temp)}°C, {weather.weather[0].description}
        </p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="weather icon"
        />
      </>
    )}
  </div>
);
};

export default WeatherWidget;
