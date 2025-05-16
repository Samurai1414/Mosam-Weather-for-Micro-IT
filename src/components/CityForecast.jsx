import { motion } from 'framer-motion';
import { useState } from 'react';

const CityForecast = ({ city, temp, condition, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Pick gradient background based on city
  const getBackgroundStyle = (cityName) => {
    const city = cityName.toLowerCase();
    
    if (city.includes('paris')) {
      return 'linear-gradient(to right, #6a11cb, #2575fc)'; // Purple to blue
    } else if (city.includes('dubai')) {
      return 'linear-gradient(to right, #f12711, #f5af19)'; // Red to orange
    } else if (city.includes('seoul')) {
      return 'linear-gradient(to right, #11998e, #38ef7d)'; // Dark green to light green
    } else if (city.includes('rio')) {
      return 'linear-gradient(to right, #0082c8, #0082c8, #92fe9d)'; // Blue to green
    } else {
      return 'linear-gradient(to right, #4facfe, #00f2fe)'; // Default blue gradient
    }
  };

  const containerStyle = {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: isHovered ? getBackgroundStyle(city) : 'white',
    color: isHovered ? 'white' : 'inherit',
  };

  const cityNameStyle = {
    fontSize: '16px',
    fontWeight: '600',
    margin: 0,
  };
  
  const temperatureStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: isHovered ? 'white' : '#333',
    margin: '5px 0',
  };
  
  const conditionStyle = {
    color: isHovered ? 'rgba(255,255,255,0.85)' : '#666',
    fontSize: '14px',
  };
  
  const leftSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  };
  
  const iconContainerStyle = {
    fontSize: '24px',
    width: '48px',
    height: '48px',
    background: isHovered ? 'rgba(255,255,255,0.25)' : '#f8f9fa',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.3s ease',
  };
  
  // Choose appropriate emoji based on weather condition
  const getWeatherIcon = (condition) => {
    const lowercaseCondition = condition.toLowerCase();
    if (lowercaseCondition.includes('sunny') || lowercaseCondition.includes('clear')) {
      return '☀️';
    } else if (lowercaseCondition.includes('rain') || lowercaseCondition.includes('shower')) {
      return '🌧️';
    } else if (lowercaseCondition.includes('cloud')) {
      return '☁️';
    } else if (lowercaseCondition.includes('snow')) {
      return '❄️';
    } else if (lowercaseCondition.includes('thunder')) {
      return '⛈️';
    } else if (lowercaseCondition.includes('fog') || lowercaseCondition.includes('mist')) {
      return '🌫️';
    } else {
      return '🌤️'; // Default to partly cloudy
    }
  };

  return (
    <motion.div
      style={containerStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.08)' 
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={leftSectionStyle}>
        <motion.div 
          style={iconContainerStyle}
          animate={isHovered ? { 
            rotate: [0, 10, 0, -10, 0], 
            scale: [1, 1.2, 1] 
          } : {}}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatType: "loop"
          }}
        >
          {getWeatherIcon(condition)}
        </motion.div>
        <div>
          <h3 style={cityNameStyle}>{city}</h3>
          <p style={conditionStyle}>{condition}</p>
        </div>
      </div>
      
      <div style={temperatureStyle}>
        {temp}°C
      </div>
    </motion.div>
  );
};

export default CityForecast; 