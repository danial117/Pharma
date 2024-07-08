import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';





const PayPalButtonComponent = ({onPaymentSuccess}) => {

const accessToken=useSelector((state)=>state.accessToken)

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
      'https://www.paypal.com/sdk/js?client-id=Af5N6smP8WXpweplc5KqOvUGyRl0eyRcT4TaC3TzC9BB0YI_s--VYb_D0T6gvREISBmf-qJzYpXIK0qa&components=buttons&enable-funding=venmo,paylater',
      () => {
       

        // Initialize PayPal Buttons
        window.paypal
          .Buttons({
            style: {
              shape: 'rect',
              layout: 'vertical',
            },
            async createOrder() {
              try {
                const response = await fetch(`http://localhost:3002/orderhttp://localhost:3002/`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`
                  },
                  body: JSON.stringify({
                    cart: [
                      {
                        id: "034324dfjf2399423rf",
                        quantity: 2,
                      },
                    ],
                  }),
                });

                const orderData = await response.json();

                if (orderData.id) {
                  return orderData.id;
                } else {
                  const errorDetail = orderData?.details?.[0];
                  const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);

                  throw new Error(errorMessage);
                }
              } catch (error) {
               
                resultMessage(`Could not initiate PayPal Checkout...<br><br>${error}`);
              }
            },
            async onApprove(data, actions) {
              try {
                const response = await fetch(`http://localhost:3002/orderhttp://localhost:3002/${data.orderID}/capture`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${accessToken}`
                  },
                });

                const orderData = await response.json();
                const errorDetail = orderData?.details?.[0];

                if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                  return actions.restart();
                } else if (errorDetail) {
                  throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
                } else if (!orderData.purchase_units) {
                  throw new Error(JSON.stringify(orderData));
                } else {
                 
                  onPaymentSuccess()
                  const transaction =
                    orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
                    orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
                  resultMessage(
                    `Transaction ${transaction.status}: ${transaction.id}<br><br>See console for all available details`,
                  );
                
                 
                }
              } catch (error) {
               
                resultMessage(
                  `Sorry, your transaction could not be processed...<br><br>${error}`,
                );
              }
            },
            createOrderButton() {
              return {
                display: 'popup', // Set this to use popup window
              };
            },
          })
          .render("#paypal-button-container");
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
    };
  }, []);

  // Example function to show a result to the user. Your site's UI library can be used instead.
  function resultMessage(message) {
    const container = document.querySelector("#result-message");
    container.innerHTML = message;
  }

  return (
    <>
    <div id="paypal-button-container"></div>
    <div id="result-message"></div> 
    </>
  );
};

export default PayPalButtonComponent;