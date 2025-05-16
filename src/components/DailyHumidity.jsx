import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const DailyHumidity = ({ data }) => {
  const [animationData, setAnimationData] = useState(null);
  
  useEffect(() => {
    // Dynamically load the animation
    fetch('/animations/cloudy.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error("Error loading animation:", error));
  }, []);

  // Extract humidity if data exists, otherwise use a default
  const humidity = data?.main?.humidity || 75;
  
  // Calculate air quality (just a demo value)
  const airQuality = 65; 
  
  const getAirQualityText = (value) => {
    if (value >= 80) return "Excellent";
    if (value >= 60) return "Good";
    if (value >= 40) return "Moderate";
    if (value >= 20) return "Poor";
    return "Very Poor";
  };
  
  const containerStyle = {
    backgroundColor: '#1f2937',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    color: 'white',
  };
  
  const headerStyle = {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '15px',
  };
  
  const contentStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  
  const humidityValueStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };
  
  const leftSectionStyle = {
    flex: '1',
  };
  
  const iconContainerStyle = {
    width: '80px',
    height: '80px',
  };
  
  const infoSectionStyle = {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '10px',
    padding: '12px',
  };

  const airQualityStyle = {
    fontSize: '13px',
    opacity: 0.9,
  };
  
  const airQualityValueStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
  };

  return (
    <motion.div 
      style={containerStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 style={headerStyle}>Humidity</h3>
      
      <div style={contentStyle}>
        <div style={leftSectionStyle}>
          <div style={humidityValueStyle}>{humidity}%</div>
          
          <div style={infoSectionStyle}>
            <div style={airQualityStyle}>
              <div>Air Quality</div>
              <div style={airQualityValueStyle}>{getAirQualityText(airQuality)}</div>
            </div>
            
            <motion.div 
              style={{
                width: '48px',
                height: '48px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '28px',
              }}
              animate={{ 
                rotate: [0, 10, 0, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 8
              }}
            >
              🌬️
            </motion.div>
          </div>
        </div>
        
        <div style={iconContainerStyle}>
          <motion.div
            animate={{ 
              y: [0, -5, 0, 5, 0],
              opacity: [1, 0.8, 1]
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: 4
            }}
            style={{ fontSize: '64px' }}
          >
            💧
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DailyHumidity; 