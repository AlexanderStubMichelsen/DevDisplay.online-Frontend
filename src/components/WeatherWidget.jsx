import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const WeatherWidget = ({ apiKey }) => {
  const [weather, setWeather] = useState(null);
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load coordinates from sessionStorage or ask user
  useEffect(() => {
    const savedCoords = sessionStorage.getItem("coords");
    if (savedCoords) {
      setCoords(JSON.parse(savedCoords));
      return;
    }

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
        setError("🌍 Location denied. Unable to fetch local weather.");
        setLoading(false);
      }
    );
  }, []);

  // Fetch weather once coords are available
  useEffect(() => {
    if (!coords) return;

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
    <div className="weather-widget">
      {loading && <div className="spinner">Loading...</div>}

      {!loading && error && <div className="error">{error}</div>}

      {!loading && weather && (
        <>
          <h4>Weather in {weather.name}</h4>
          <p>
            {Math.round(weather.main.temp)}°C,{" "}
            {weather.weather[0].description}
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

WeatherWidget.propTypes = {
  apiKey: PropTypes.string.isRequired,
};

export default WeatherWidget;
