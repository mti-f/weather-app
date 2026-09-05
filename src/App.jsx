import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
  const fetchWeatherByCoords = async (lat, lon, cityName = '') => {
    setLoading(true);
    setError('');
    setWeather(null);
    setForecast(null);

    try {
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
      );
      const weatherData = await weatherRes.json();

      
      let name = cityName;
      let country = '';

      if (!name) {
        
        name = 'Current Location';
      }

      setWeather({
        name,
        country,
        temp: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m,
        windSpeed: weatherData.current.wind_speed_10m,
      });

      setForecast(weatherData.daily);
      if (cityName) {
        localStorage.setItem('lastCity', cityName);
      }

    } catch (err) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  
  const fetchWeatherByCity = async (cityName) => {
    setLoading(true);
    setError('');
    setWeather(null);
    setForecast(null);

    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`);
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('City not found');
      }

      const { latitude, longitude, name, country } = geoData.results[0];
      
      
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
      );
      const weatherData = await weatherRes.json();

      setWeather({
        name,
        country,
        temp: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m,
        windSpeed: weatherData.current.wind_speed_10m,
      });

      setForecast(weatherData.daily);
      localStorage.setItem('lastCity', name);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  
  const handleGeoLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherByCoords(lat, lon, 'My Location');
      },
      () => {
        setLoading(false);
        setError('Unable to retrieve your location');
      }
    );
  };

  useEffect(() => {
    const savedCity = localStorage.getItem('lastCity');
    if (savedCity) {
      setCity(savedCity);
      fetchWeatherByCity(savedCity);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city) return;
    fetchWeatherByCity(city);
  };

  const handleQuickSelect = (selectedCity) => {
    setCity(selectedCity);
    fetchWeatherByCity(selectedCity);
  };

  return (
    <div className="app-container">
      <h1>Weather App</h1>
      
      <SearchBar 
        city={city} 
        setCity={setCity} 
        onSearch={handleSubmit} 
        onQuickSelect={handleQuickSelect}
        onGeoLocation={handleGeoLocation}
      />

      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p style={{ marginTop: '10px', fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>Loading weather data...</p>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      {weather && <WeatherCard weather={weather} />}
      {forecast && <Forecast forecastData={forecast} />}
    </div>
  );
}

export default App;