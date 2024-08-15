// src/analytics.js
import ReactGA from 'react-ga4';



const TRACKING_ID = process.env.REACT_APP_ANALYTICS; // Replace with your GA4 Tracking ID
console.log(process.env)
ReactGA.initialize(TRACKING_ID);

export const logPageView = () => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};
