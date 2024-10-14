/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const Alert = ({ message, duration = 2000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer); // Timer'ı temizle
    }
  }, [message, duration]);

  return (
    isVisible && (
      <div id="custom-alert" className="bg-green-500 text-white p-4 rounded shadow-lg">
        <p id="alert-message">{message}</p>
        {/* <button 
          id="close-alert" 
          className="mt-4 bg-white text-green-500 px-2 py-1 rounded" 
          onClick={() => setIsVisible(false)}
        >
          Close
        </button> */}
      </div>
    )
  );
};

export default Alert;