export default function WeatherCard({ weather }) {
  return (
    <div className="weather-card">
      <h2>{weather.name}, {weather.country}</h2>
      <p className="temp">{weather.temp}°C</p>
      <div className="weather-details" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '15px', fontSize: '14px', color: '#555' }}>
        <p> رطوبت: {weather.humidity}%</p>
        <p>ลม سرعت باد: {weather.windSpeed} km/h</p>
      </div>
    </div>
  );
}