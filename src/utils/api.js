// api.js
import axios from 'axios';

import { setAccessToken } from '../state/index.js';
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  
});

let state; // Define a variable to hold the store instance

const getStore = () => {
  if (!state) {
    // Lazy initialization to avoid circular dependencies
    const { store } = require('../state/store.js'); // Import store inside the function
    state = store;
    
  
  }
  return state;
};




// Request interceptor to add access token to headers
api.interceptors.request.use(
  async (config) => {
    
    
    
    const accessToken =getStore().getState().accessToken
   
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors and refresh the token
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if(error.response.status === 404){
      return error.response
    }

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
    
      
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/refresh-token`,  {
            withCredentials: true, 
          });

        getStore().dispatch(setAccessToken({ accessToken: data.accessToken }));
        dispatch
        api.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch (err) {
      
        // Handle logout or token refresh failure
      }
    }

    return Promise.reject(error);
  }
);

export default api;
