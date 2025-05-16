import { useState } from 'react'
import { motion } from 'framer-motion'

function SearchForm({ onSearch }) {
  const [city, setCity] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.trim()) {
      onSearch(city.trim())
    }
  }

  const formStyle = {
    position: 'relative',
  }

  const flexContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  }

  const inputContainerStyle = {
    position: 'relative',
    flex: '1',
  }

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1.25rem',
    paddingLeft: '2.5rem',
    borderRadius: '0.75rem',
    border: '1px solid #bfdbfe',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  }

  const iconStyle = {
    position: 'absolute',
    top: '50%',
    left: '0.75rem',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
    pointerEvents: 'none',
  }

  const buttonStyle = {
    background: 'linear-gradient(to right, #3b82f6, #2563eb)',
    color: 'white',
    padding: '0.75rem 2rem',
    borderRadius: '0.75rem',
    fontWeight: '500',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  }

  // Media query for larger screens
  if (window.innerWidth >= 640) {
    flexContainerStyle.flexDirection = 'row';
  }

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={flexContainerStyle}>
        <motion.div 
          style={inputContainerStyle}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={inputStyle}
            required
          />
          <motion.span 
            style={iconStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.5 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </motion.span>
        </motion.div>
        
        <motion.button 
          type="submit"
          style={buttonStyle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Get Weather
        </motion.button>
      </div>
    </form>
  )
}

export default SearchForm 