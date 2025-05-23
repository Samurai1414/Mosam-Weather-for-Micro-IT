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
    padding: '10px',
    position: 'relative',
    '@media (max-width: 768px)': {
      padding: '5px',
    }
  }

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '15px',
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    '@media (max-width: 768px)': {
      marginBottom: '15px',
      padding: '8px',
      justifyContent: 'center',
    }
  }

  const searchBarStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
    borderRadius: '25px',
    padding: '12px 20px',
    flex: '1',
    width: '100%',
    maxWidth: '400px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    margin: '0 20px',
    '@media (max-width: 768px)': {
      margin: '0 5px',
      padding: '10px 15px',
      maxWidth: '100%',
    }
  }

  const searchInputStyle = {
    border: 'none',
    outline: 'none',
    width: '100%',
    fontSize: '15px',
    backgroundColor: 'transparent',
    '@media (max-width: 768px)': {
      fontSize: '14px',
    }
  }

  const iconsBarStyle = {
    display: 'flex',
    gap: '20px',
    '@media (max-width: 768px)': {
      gap: '15px',
    }
  }

  const iconStyle = {
    width: '24px',
    height: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f6fa',
    borderRadius: '50%',
    padding: '8px',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#e8e9ec',
    },
    '@media (max-width: 768px)': {
      width: '20px',
      height: '20px',
      padding: '6px',
    }
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginTop: '20px',
    padding: '0 10px',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '15px',
      padding: '0 5px',
      marginTop: '15px',
    }
  }

  const sidebarStyle = {
    width: '70px',
    position: 'fixed',
    left: '0',
    top: '0',
    bottom: '0',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px 0',
    boxShadow: '2px 0 10px rgba(0,0,0,0.05)',
    zIndex: 1000,
    '@media (max-width: 768px)': {
      width: '100%',
      height: '65px',
      bottom: '0',
      top: 'auto',
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: '8px 15px',
      boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
    }
  }

  const logoStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '40px',
    '@media (max-width: 768px)': {
      fontSize: '24px',
      marginBottom: '0',
    }
  }

  const navIconStyle = {
    width: '40px',
    height: '40px',
    margin: '15px 0',
    cursor: 'pointer',
    color: '#a0a0a0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#f5f6fa',
    },
    '@media (max-width: 768px)': {
      margin: '0',
      width: '35px',
      height: '35px',
    }
  }

  const activeNavIconStyle = {
    ...navIconStyle,
    color: '#ff7e45',
    backgroundColor: '#fff1ec',
    position: 'relative',
    ':hover': {
      backgroundColor: '#ffe4db',
    }
  }

  const mainContentStyle = {
    marginLeft: '70px',
    flex: 1,
    '@media (max-width: 768px)': {
      marginLeft: '0',
      marginBottom: '75px',
    }
  }

  const calendarStyle = {
    position: 'absolute',
    top: '70px',
    right: '20px',
    width: '300px',
    backgroundColor: 'white',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    borderRadius: '15px',
    padding: '20px',
    zIndex: 100,
    '@media (max-width: 768px)': {
      width: '90%',
      right: '5%',
      top: '60px',
      padding: '15px',
    }
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
      </div>
      
      <div style={mainContentStyle}>
        <header style={headerStyle}>
          <div style={searchBarStyle}>
            <input 
              type="text" 
              placeholder="Search for a city..." 
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
