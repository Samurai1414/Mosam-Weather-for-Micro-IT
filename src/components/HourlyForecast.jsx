import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import config from '../config';

const HourlyForecast = () => {
  const [hourlyData, setHourlyData] = useState([
    { time: "Morning", temp: "20°", icon: "🌤️" },
    { time: "Afternoon", temp: "24°", icon: "☀️" },
    { time: "Evening", temp: "28°", icon: "⛅" },
    { time: "Night", temp: "22°", icon: "🌙" },
  ]);
  
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  
  useEffect(() => {
    const fetchHourlyData = async () => {
      try {
        // Fetch forecast data from API
        const response = await fetch(`${config.API_URL}/api/forecast`);
        if (!response.ok) throw new Error('Failed to fetch forecast data');
        
        const data = await response.json();
        
        // Process API data
        if (data && data.list && data.list.length >= 4) {
          const timeSlots = [
            { name: 'Morning', hour: 9 },
            { name: 'Afternoon', hour: 15 },
            { name: 'Evening', hour: 18 },
            { name: 'Night', hour: 21 }
          ];
          
          // Filter forecast data for the current day and map to our format
          const today = new Date().getDate();
          const formattedData = timeSlots.map(slot => {
            // Find forecast entry closest to the desired hour
            const entry = data.list.find(item => {
              const itemDate = new Date(item.dt * 1000);
              return itemDate.getDate() === today && 
                     Math.abs(itemDate.getHours() - slot.hour) < 3;
            }) || data.list[slot.name === 'Morning' ? 0 : slot.name === 'Afternoon' ? 1 : slot.name === 'Evening' ? 2 : 3];
            
            const temp = entry ? Math.round(entry.main.temp - 273.15) : '--';
            const condition = entry?.weather[0]?.main?.toLowerCase() || '';
            
            // Get appropriate weather icon
            let icon = '🌤️';
            if (condition.includes('clear')) {
              icon = slot.name === 'Night' ? '🌙' : '☀️';
            } else if (condition.includes('cloud')) {
              icon = '☁️';
            } else if (condition.includes('rain')) {
              icon = '🌧️';
            } else if (condition.includes('snow')) {
              icon = '❄️';
            } else if (condition.includes('thunder')) {
              icon = '⛈️';
            } else if (condition.includes('fog') || condition.includes('mist')) {
              icon = '🌫️';
            }
            
            return {
              time: slot.name,
              temp: `${temp}°`,
              icon
            };
          });
          
          setHourlyData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching hourly forecast:', error);
        // Keep using the default data in case of error
      } finally {
        setLoading(false);
      }
    };
    
    fetchHourlyData();
  }, []);

  // Get background color based on time of day
  const getTimeBackgroundColor = (timeOfDay) => {
    switch(timeOfDay.toLowerCase()) {
      case 'morning':
        return 'linear-gradient(135deg, #fad961, #f76b1c)'; // Yellow to orange
      case 'afternoon':
        return 'linear-gradient(135deg, #f5af19, #f12711)'; // Orange to red
      case 'evening':
        return 'linear-gradient(135deg, #5f2c82, #49a09d)'; // Purple to teal
      case 'night':
        return 'linear-gradient(135deg, #141e30, #243b55)'; // Dark blue
      default:
        return 'linear-gradient(135deg, #2193b0, #6dd5ed)'; // Blue
    }
  };
  
  const getTimeTextColor = (timeOfDay) => {
    return timeOfDay.toLowerCase() === 'night' ? 'white' : 'inherit';
  };
  
  const containerStyle = {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  };
  
  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };
  
  const titleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    margin: 0,
  };
  
  const forecastGridStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    gap: '10px',
  };
  
  const hourlyItemStyle = (index) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    padding: '15px 10px',
    borderRadius: '12px',
    cursor: 'pointer',
    background: activeIndex === index ? getTimeBackgroundColor(hourlyData[index].time) : '#f8f9fa',
    color: activeIndex === index ? getTimeTextColor(hourlyData[index].time) : 'inherit',
    transition: 'all 0.3s ease',
  });

  const iconContainerStyle = (index) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: activeIndex === index ? 'rgba(255,255,255,0.25)' : 'white',
    marginBottom: '8px',
    fontSize: '24px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  });
  
  const temperatureStyle = (index) => ({
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '4px',
    color: activeIndex === index && hourlyData[index].time.toLowerCase() === 'night' ? 'white' : activeIndex === index ? '#333' : '#333',
  });
  
  const timeStyle = (index) => ({
    fontSize: '13px',
    fontWeight: '500',
    color: activeIndex === index ? (hourlyData[index].time.toLowerCase() === 'night' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)') : '#666',
  });
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      style={containerStyle}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div style={headerStyle}>
        <h3 style={titleStyle}>How is the temperature today?</h3>
      </div>
      
      {/* Center button with orange background */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <motion.div 
          style={{
            backgroundColor: '#ff7e45',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer'
          }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
        >
          🌡️
        </motion.div>
      </div>
      
      <div style={forecastGridStyle}>
        {hourlyData.map((item, index) => (
          <motion.div 
            key={index}
            style={hourlyItemStyle(index)}
            variants={itemVariants}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            whileHover={{ scale: 1.03 }}
          >
            <motion.div 
              style={iconContainerStyle(index)}
              animate={activeIndex === index ? {
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0, -10, 0],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              {item.icon}
            </motion.div>
            <div style={temperatureStyle(index)}>{item.temp}</div>
            <div style={timeStyle(index)}>{item.time}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HourlyForecast; 