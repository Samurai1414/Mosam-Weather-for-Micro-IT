import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Lottie from 'lottie-react'
import WeatherCard from './components/WeatherCard'
import CityForecast from './components/CityForecast'
import HourlyForecast from './components/HourlyForecast'
import DailyHumidity from './components/DailyHumidity'
import CurrentLocation from './components/CurrentLocation'
import Loading from './components/Loading'
import config from './config'

function App() {
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [otherCities, setOtherCities] = useState([])
  const [username, setUsername] = useState("Visitors")
  const [selectedLocation, setSelectedLocation] = useState("Dhaka, Bangladesh")
  const [activeNav, setActiveNav] = useState('home')
  const [showCalendar, setShowCalendar] = useState(false)
  
  const fetchWeather = async (cityName) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${config.API_URL}/api/weather?city=${encodeURIComponent(cityName)}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to fetch weather data')
      }
      const data = await response.json()
      setWeather(data)
      setSelectedLocation(`${data.name}, ${data.sys.country}`)
    } catch (err) {
      setError(err.message || 'An error occurred while fetching weather data')
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  const fetchOtherCitiesData = async () => {
    try {
      const cities = ['Mumbai', 'Kolkata'];
      const citiesData = await Promise.all(
        cities.map(async (cityName) => {
          const response = await fetch(`${config.API_URL}/api/weather?city=${encodeURIComponent(cityName)}`);
          if (!response.ok) return null;
          const data = await response.json();
          return {
            name: cityName,
            temp: Math.round(data.main.temp - 273.15),
            condition: data.weather[0].main
          };
        })
      );
      
      setOtherCities(citiesData.filter(city => city !== null));
    } catch (error) {
      console.error('Error fetching other cities data:', error);
    }
  };

  useEffect(() => {
    // Fetch default weather data on load
    fetchWeather('Delhi');
    fetchOtherCitiesData();
  }, []);

  const handleSearch = (cityName) => {
    setCity(cityName);
    fetchWeather(cityName);
  }

  const handleNavClick = (navItem) => {
    setActiveNav(navItem);
    
    // Close calendar if open
    if (showCalendar) {
      setShowCalendar(false);
    }
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const appStyle = {
    fontFamily: "'Poppins', 'Segoe UI', sans-serif",
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fafbfd',
    minHeight: '100vh',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    position: 'relative',
  }

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  }

  const searchBarStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '8px 16px',
    flex: '1',
    maxWidth: '300px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  }

  const searchInputStyle = {
    border: 'none',
    outline: 'none',
    width: '100%',
    fontSize: '14px',
  }

  const iconsBarStyle = {
    display: 'flex',
    gap: '20px',
  }

  const iconStyle = {
    width: '24px',
    height: '24px',
    cursor: 'pointer',
  }

  const userProfileStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  }

  const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#eee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
    overflow: 'hidden',
  }

  const contentContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  }

  const sidebarStyle = {
    width: '80px',
    position: 'absolute',
    left: '0',
    top: '0',
    bottom: '0',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 0',
    boxShadow: '2px 0 10px rgba(0,0,0,0.05)'
  }

  const logoStyle = {
    color: '#ff7e45',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '40px',
  }

  const navIconStyle = {
    width: '24px',
    height: '24px',
    margin: '15px 0',
    cursor: 'pointer',
    color: '#a0a0a0',
  }

  const activeNavIconStyle = {
    ...navIconStyle,
    color: '#ff7e45',
    position: 'relative',
  }

  const mainContentStyle = {
    marginLeft: '80px',
    flex: 1,
  }

  const calendarStyle = {
    position: 'absolute',
    top: '70px',
    right: '80px',
    width: '300px',
    backgroundColor: 'white',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    borderRadius: '10px',
    padding: '15px',
    zIndex: 100,
  }

  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  return (
    <div style={appStyle}>
      <div style={sidebarStyle}>
        <div style={logoStyle}>☀️</div>
        <div 
          style={activeNav === 'home' ? activeNavIconStyle : navIconStyle}
          onClick={() => handleNavClick('home')}
        >🏠</div>
        <div 
          style={activeNav === 'stats' ? activeNavIconStyle : navIconStyle}
          onClick={() => handleNavClick('stats')}
        >📊</div>
        <div 
          style={activeNav === 'search' ? activeNavIconStyle : navIconStyle}
          onClick={() => handleNavClick('search')}
        >🔍</div>
        <div 
          style={activeNav === 'settings' ? activeNavIconStyle : navIconStyle}
          onClick={() => handleNavClick('settings')}
        >⚙️</div>
        <div 
          style={activeNav === 'notes' ? activeNavIconStyle : navIconStyle}
          onClick={() => handleNavClick('notes')}
        >📝</div>
      </div>
      
      <div style={mainContentStyle}>
        <header style={headerStyle}>
          <div style={userProfileStyle}>
            <h3>Hello, {username}</h3>
            <div style={avatarStyle}>
              <img src="https://via.placeholder.com/40" alt="User" width="40" height="40" />
            </div>
          </div>
          
          <div style={searchBarStyle}>
            <input 
              type="text" 
              placeholder="Search here..." 
              style={searchInputStyle} 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(city)}
            />
            <span onClick={() => handleSearch(city)} style={{cursor: 'pointer'}}>🔍</span>
          </div>
          
          <div style={iconsBarStyle}>
            <span style={iconStyle} onClick={toggleCalendar}>📅</span>
            <span style={iconStyle}>🔔</span>
          </div>
        </header>
        
        {showCalendar && (
          <motion.div 
            style={calendarStyle}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h3 style={{ margin: '0 0 15px 0' }}>Calendar</h3>
            <div style={{ fontWeight: 'bold' }}>{getCurrentDate()}</div>
            <div style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
              Click on a date to view weather forecast
            </div>
          </motion.div>
        )}
        
        {loading && <Loading />}
        
        {error && (
          <motion.div 
            style={{
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: '#ffebee',
              color: '#c62828',
              marginBottom: '20px'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}
        
        {weather && !loading && activeNav === 'home' && (
          <div style={contentContainerStyle}>
            <CurrentLocation 
              weather={weather} 
              location={selectedLocation} 
            />
            
            <WeatherCard 
              weatherData={weather} 
              showDetails={true}
            />
            
            <HourlyForecast />
            
            <DailyHumidity data={weather} />
            
            {otherCities.map((city, index) => (
              <CityForecast 
                key={index}
                city={city.name} 
                temp={city.temp} 
                condition={city.condition} 
                onClick={() => handleSearch(city.name)}
              />
            ))}
          </div>
        )}

        {activeNav === 'stats' && (
          <div style={{ padding: '20px' }}>
            <h2>Weather Statistics</h2>
            <p>This section will contain weather statistics and charts.</p>
          </div>
        )}

        {activeNav === 'search' && (
          <div style={{ padding: '20px' }}>
            <h2>Advanced Search</h2>
            <p>Search for weather data by different parameters.</p>
          </div>
        )}

        {activeNav === 'settings' && (
          <div style={{ padding: '20px' }}>
            <h2>Settings</h2>
            <p>Configure your weather dashboard preferences.</p>
          </div>
        )}

        {activeNav === 'notes' && (
          <div style={{ padding: '20px' }}>
            <h2>Weather Notes</h2>
            <p>Your saved weather notes and reminders.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
