export default function Forecast({ forecastData }) {
  if (!forecastData || !forecastData.time) return null;

  return (
    <div className="forecast-container">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {forecastData.time.map((dateStr, index) => {
          // تبدیل تاریخ میلادی به نام روز کوتاه (مثلا Mon, Tue)
          const date = new Date(dateStr);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

          return (
            <div key={index} className="forecast-item">
              <p className="forecast-day">{dayName}</p>
              <p className="forecast-temp">{Math.round(forecastData.temperature_2m_max[index])}°</p>
              <p className="forecast-temp" style={{ opacity: 0.6, fontSize: '11px' }}>{Math.round(forecastData.temperature_2m_min[index])}°</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}