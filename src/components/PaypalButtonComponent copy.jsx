import React, { useEffect } from 'react';

const PayPalButtonComponent = () => {
   useEffect(() => {
    // Function to load a script
    const loadScript = (src, onLoad) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = onLoad;
      document.body.appendChild(script);
    };

    // Load the PayPal SDK script
    loadScript(
      'https://www.paypal.com/sdk/js?client-id=AYdJ54cARnHAFCmuk0opLZBTQs8CcAah-ia1dNHZSqqlGYlmq-PDG8iLtCSXYAuHFvqgD3OUeFvAJuaj&components=buttons&enable-funding=venmo',
      () => {
        console.log('PayPal SDK script loaded');

        // Load the app.js script after PayPal SDK script is loaded
        loadScript('http://localhost:3002/assets/images/app.js', () => {
          console.log('app.js script loaded');
        });
      }
    );

    // Cleanup function to remove scripts on component unmount
    return () => {
      const paypalScript = document.querySelector(
        'script[src^="https://www.paypal.com/sdk/js"]'
      );
      if (paypalScript) {
        document.body.removeChild(paypalScript);
      }

      const appScript = document.querySelector('script[src="http://localhost:3002/assets/images/app.js"]');
      if (appScript) {
        console.log('removed')
        document.body.removeChild(appScript);
      }
    };
  }, []);

  return (
    <>
    <div id="paypal-button-container"></div>
    <div id="result-message"></div> 
    </>
  );
};

export default PayPalButtonComponent;