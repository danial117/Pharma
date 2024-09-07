// CMSContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context
const CMSContext = createContext();

// Create a provider component
export const CMSProvider = ({ children }) => {
  const [cmsData, setCmsData] = useState({});





  useEffect(() => {
    const fetchCmsData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/CMS/show`); // Replace with your CMS data API endpoint
        const data = await response.json();
        setCmsData(data[0]);
      } catch (error) {
        console.error('Failed to fetch CMS data', error);
      }
    };

    fetchCmsData();
  }, []);

  return (
    <CMSContext.Provider value={cmsData}>
      {children}
    </CMSContext.Provider>
  );
};

// Custom hook to use CMS context
export const useCMS = () => useContext(CMSContext);
