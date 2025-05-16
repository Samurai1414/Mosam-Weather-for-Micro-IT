import { motion } from 'framer-motion';

function Loading() {
  const containerStyle = {
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    width: '100%',
  };
  
  const loadingCardStyle = {
    backgroundColor: 'white',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
  
  const textStyle = {
    fontSize: '16px',
    color: '#666',
    marginTop: '20px',
    fontWeight: '500'
  };
  
  const dotContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '10px',
  };

  return (
    <div style={containerStyle}>
      <motion.div 
        style={loadingCardStyle}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div style={dotContainerStyle}>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                width: '15px',
                height: '15px',
                backgroundColor: '#ff7e45',
                borderRadius: '50%',
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        
        <motion.div
          style={textStyle}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Loading weather data...
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Loading; 