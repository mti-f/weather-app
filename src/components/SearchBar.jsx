export default function SearchBar({ city, setCity, onSearch, onQuickSelect, onGeoLocation }) {
  const popularCities = ['Tehran', 'London', 'Paris', 'Tokyo'];

  return (
    <div className="search-section">
      <form onSubmit={onSearch} className="search-box">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
        <button 
          type="button" 
          onClick={onGeoLocation}
          title="Use my location"
          style={{
            padding: '12px 15px',
            background: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '10px',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          📍
        </button>
      </form>

      <div className="quick-cities">
        <span>Popular:</span>
        {popularCities.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onQuickSelect(item)}
            className="quick-btn"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}