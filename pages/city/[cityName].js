import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';

export default function CityPage() {
  const router = useRouter();
  const { cityName } = router.query;

  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [weatherLoading, setWeatherLoading] = useState(false);

  useEffect(() => {
    if (!cityName) return;

    const fetchCityDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&language=en&count=1`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const cityData = data.results[0];
          setCity({
            name: cityData.name,
            country: cityData.country,
            coordinates: {
              latitude: cityData.latitude,
              longitude: cityData.longitude,
            },
          });

          fetchWeatherData(cityData.latitude, cityData.longitude);
        } else {
          setCity(null);
        }
      } catch (error) {
        console.error('Error fetching city data:', error);
        setCity(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchWeatherData = async (latitude, longitude) => {
      try {
        setWeatherLoading(true);
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=apparent_temperature,precipitation_probability,wind_speed_10m`
        );
        const weatherData = await weatherResponse.json();

        setWeather(weatherData.hourly || {});
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setWeather(null);
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchCityDetails();
  }, [cityName]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading">
          <h1>Loading city information...</h1>
        </div>
      </>
    );
  }

  if (!city) {
    return (
      <>
        <Navbar />
        <div className="content">
          <h1>City not found</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="content">
        <div className="city-details card">
          <h1>{city.name}</h1>
          <p>Country: {city.country}</p>
          <p>Coordinates: {city.coordinates.latitude}, {city.coordinates.longitude}</p>
        </div>

        <div className="weather-info card">
          <h2>Weather Information</h2>
          {weatherLoading ? (
            <p>Loading weather data...</p>
          ) : weather ? (
            <div>
              <h3>Hourly Weather Data</h3>
              <ul>
                {weather.apparent_temperature && weather.apparent_temperature.length > 0 ? (
                  weather.apparent_temperature.slice(0, 5).map((temp, index) => (
                    <li key={index}>Hour {index + 1}: {temp}°C</li>
                  ))
                ) : (
                  <li>No temperature data available</li>
                )}
              </ul>
              <h4>Additional Weather Data:</h4>
              <ul>
                {weather.precipitation_probability && weather.precipitation_probability[0] !== undefined && (
                  <li>Precipitation Probability: {weather.precipitation_probability[0]}%</li>
                )}
                {weather.wind_speed_10m && weather.wind_speed_10m[0] !== undefined && (
                  <li>Wind Speed: {weather.wind_speed_10m[0]} m/s</li>
                )}
              </ul>
            </div>
          ) : (
            <p>Weather data unavailable</p>
          )}
        </div>
      </div>
    </>
  );
}
