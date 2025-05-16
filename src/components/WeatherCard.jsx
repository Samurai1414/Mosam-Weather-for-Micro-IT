import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';

function WeatherCard({ weatherData, showDetails = true }) {
  const [animationData, setAnimationData] = useState(null);
  
  const { 
    name, 
    main: { temp, humidity, feels_like, pressure }, 
    weather, 
    wind,
    sys: { country }
  } = weatherData;

  // Convert temperature from Kelvin to Celsius
  const tempCelsius = Math.round(temp - 273.15);
  const feelsLikeCelsius = Math.round(feels_like - 273.15);
  
  // Determine which animation to use based on weather condition
  const weatherCondition = weather[0].main.toLowerCase();
  let animationPath = '';
  
  if (weatherCondition.includes('clear')) {
    animationPath = '/animations/sunny.json';
  } else if (weatherCondition.includes('cloud')) {
    animationPath = '/animations/cloudy.json';
  } else if (weatherCondition.includes('rain') || weatherCondition.includes('drizzle')) {
    animationPath = '/animations/rainy.json';
  } else {
    animationPath = '/animations/cloudy.json'; // default
  }
  
  useEffect(() => {
    // Dynamically load the animation
    fetch(animationPath)
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error("Error loading animation:", error));
  }, [animationPath]);

  // Styles for the component
  const containerStyle = {
    backgroundColor: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'column',
  };

  const headerStyle = {
    backgroundColor: '#4da6ff', 
    color: 'white',
    padding: '20px',
    position: 'relative',
    minHeight: '140px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };
  
  const locationStyle = {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  };
  
  const tempContainerStyle = {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  };
  
  const temperatureStyle = {
    fontSize: '40px',
    fontWeight: 'bold',
  };
  
  const conditionStyle = {
    fontSize: '18px',
    marginBottom: '8px',
    opacity: 0.9,
    textTransform: 'capitalize',
  };
  
  const conditionContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
  };
  
  const animationContainerStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '100px',
    height: '100px',
    overflow: 'hidden',
  };
  
  const detailsStyle = {
    padding: '20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
  };
  
  const detailItemStyle = {
    padding: '12px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
  };
  
  const detailLabelStyle = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '5px',
  };
  
  const detailValueStyle = {
    fontSize: '16px',
    fontWeight: '600',
  };

  return (
    <motion.div
      style={containerStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={headerStyle}>
        <div style={locationStyle}>
          <span>📍</span> 
          <span>{name}, {country}</span>
        </div>
        
        <div style={tempContainerStyle}>
          <div style={conditionContainerStyle}>
            <div style={conditionStyle}>
              {weather[0].description}
            </div>
            <div style={temperatureStyle}>
              {tempCelsius}°C
            </div>
            <div style={{ fontSize: '14px' }}>
              Feels like {feelsLikeCelsius}°C
            </div>
          </div>
        </div>
        
        {animationData && (
          <div style={animationContainerStyle}>
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
            />
          </div>
        )}
      </div>
      
      {showDetails && (
        <div style={detailsStyle}>
          <motion.div 
            style={detailItemStyle}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div style={detailLabelStyle}>Humidity</div>
            <div style={detailValueStyle}>{humidity}%</div>
          </motion.div>
          
          <motion.div 
            style={detailItemStyle}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div style={detailLabelStyle}>Wind Speed</div>
            <div style={detailValueStyle}>{wind.speed} m/s</div>
          </motion.div>
          
          <motion.div 
            style={detailItemStyle}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div style={detailLabelStyle}>Pressure</div>
            <div style={detailValueStyle}>{pressure} hPa</div>
          </motion.div>
          
          <motion.div 
            style={detailItemStyle}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div style={detailLabelStyle}>Visibility</div>
            <div style={detailValueStyle}>{(weatherData.visibility / 1000).toFixed(1)} km</div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

export default WeatherCard; 