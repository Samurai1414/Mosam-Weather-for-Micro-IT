import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';

const CurrentLocation = ({ weather, location }) => {
  const [showMore, setShowMore] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  
  if (!weather) return null;
  
  const { main, wind } = weather;
  const tempCelsius = Math.round(main.temp - 273.15);
  const weatherCondition = weather.weather[0].main.toLowerCase();
  
  // Determine which animation to use based on weather condition
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
  
  const containerStyle = {
    position: 'relative',
    backgroundColor: '#83c3e8',
    borderRadius: '20px',
    padding: '24px',
    color: 'white',
    height: '200px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };
  
  const locationBarStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    marginBottom: '20px',
  };
  
  const locationIconStyle = {
    fontSize: '16px',
  };
  
  const labelTextStyle = {
    fontSize: '12px',
    opacity: 0.8,
    marginBottom: '4px',
  };
  
  const temperatureStyle = {
    fontSize: '60px',
    fontWeight: 'bold',
    lineHeight: 1,
  };
  
  const feelsLikeStyle = {
    fontSize: '14px',
    opacity: 0.9,
    marginTop: '4px',
  };

  const animationContainerStyle = {
    position: 'absolute',
    top: '10px',
    right: '20px',
    width: '180px',
    height: '180px',
    mixBlendMode: 'screen',
  };
  
  const weatherStatsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  };
  
  const statItemStyle = {
    textAlign: 'center',
    padding: '8px 16px',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: '10px',
  };

  return (
    <motion.div 
      style={containerStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div>
        <div style={locationBarStyle}>
          <span style={locationIconStyle}>📍</span>
          <span>{location}</span>
        </div>
        
        <div>
          <span style={labelTextStyle}>Weather</span>
          <p style={{ fontSize: '16px', marginTop: '4px' }}>Now</p>
        </div>
      </div>
      
      <div>
        <div style={temperatureStyle}>
          {tempCelsius}°C
        </div>
        <div style={feelsLikeStyle}>
          Feels like {Math.round(main.feels_like - 273.15)}°C
        </div>
      </div>
      
      <div style={weatherStatsStyle}>
        <div style={statItemStyle}>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Visibility</div>
          <div style={{ fontWeight: 'bold' }}>{(weather.visibility / 1000).toFixed(1)} Km</div>
        </div>
        
        <div style={statItemStyle}>
          <div style={{ fontSize: '12px', opacity: 0.8 }}>Humidity</div>
          <div style={{ fontWeight: 'bold' }}>{main.humidity}%</div>
        </div>
      </div>
      
      <div style={animationContainerStyle}>
        {animationData && (
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
          />
        )}
      </div>
    </motion.div>
  );
};

export default CurrentLocation; 