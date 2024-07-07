
import Cart from "../models/CartModel.js";
import Order from "../models/OrderModel.js"
import Product from "../models/ProductModel.js";







const base = "https://api-m.sandbox.paypal.com";

export const CreateUserOrder = async (req, res) => {
  try {
    // Retrieve user's cart
    const { userId } = req.user; // Assuming req.user is populated with user data
    console.log(userId)
    const cart = await Cart.findOne({ user: userId });
    console.log(cart)
    if (cart.items.length === 0) {
      return res.status(404).json({ error: 'Cart not found for user' });
    }

    // Fetch product prices and calculate total amount
    if(cart.items.length !== 0){
    const itemsWithPrices = await Promise.all(cart.items.map(async (item) => {
      const product = await Product.findById(item.product);
      return {
        product: item.product,
        quantity: item.quantity,
        price: product.price, // Get price from product model
      };
    }));

    const totalAmount = calculateTotalAmount(itemsWithPrices);

    // Check for an existing pending order
    const existingOrder = await Order.findOne({ user: userId, orderStatus: 'Pending',  orderStatus: {
      $ne: 'Completed' // Not equal to 'completed'
  },paymentMethod: 'Unknown'  });

    if (existingOrder) {
      // If an existing pending order is found, replace it with the new order data
      existingOrder.items = itemsWithPrices;
      existingOrder.totalAmount = totalAmount.toFixed(2);
      existingOrder.updatedAt = new Date(); // Update the updatedAt field
      await existingOrder.save();

      // Clear the user's cart after updating the order
      cart.items = [];
      await cart.save();

      return res.status(201).json(existingOrder);
    }

    // Prepare new order data
    const orderData = {
      orderNumber: generateOrderNumber(), // Function to generate a unique order number
      user: userId,
      items: itemsWithPrices,
      paymentMethod: 'Unknown',
      paymentStatus: 'Pending',
      orderStatus: 'Pending',
      totalAmount: totalAmount.toFixed(2),
    };

    // Create new order
    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();

    // Clear the user's cart after creating the order
    cart.items = [];
    await cart.save();
    res.status(201).json(savedOrder);
}
   
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

function generateOrderNumber() {
    return 'lx' + Math.random().toString(36).substr(2, 8) + '-' + Math.random().toString(36).substr(2, 6);
  }
  
  // Helper function to calculate total amount based on cart items
  function calculateTotalAmount(items) {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }











  export const getUserOrder = async (req, res) => {
    try {
      // Assuming req.user is populated with user data by authMiddleware
      const { userId } = req.user;
  
      // Find the user's order
      const order = await Order.findOne({ user: userId, orderStatus: 'Pending',  orderStatus: {
        $ne: 'Completed' // Not equal to 'completed'
    },paymentMethod: 'Unknown'  }).populate('items.product');
      console.log(order)
      if (!order) {
        return res.status(404).json({ error: 'Order not found for user' });
      }
  
      res.status(200).json(order);
    } catch (error) {
      console.error('Error retrieving order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };





  export const CreatePaypalOrder = async (req, res) => {
    try {
      const { userId } = req.user; // Assuming userId is available in req.user after authentication
      const order = await Order.findOne({ user: userId, orderStatus: 'Pending',  orderStatus: {
        $ne: 'Completed' // Not equal to 'completed'
    },paymentMethod: 'Unknown'  }).populate('items.product');
  
      if (!order) {
        return res.status(404).json({ error: 'Pending order not found for user' });
      }
  
      const { jsonResponse, httpStatusCode } = await createOrder(userId);
      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to create PayPal order:", error);
      res.status(500).json({ error: "Failed to create PayPal order." });
    }
  };
  
  const createOrder = async (userId) => {
    try {
      const order=await Order.findOne({ user: userId, orderStatus: 'Pending',  orderStatus: {
        $ne: 'Completed' // Not equal to 'completed'
    },paymentMethod: 'Unknown'  });
      
      const accessToken = await generateAccessToken();
      const url = `${base}/v2/checkout/orders`;
      const payload = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: order.totalAmount.toFixed(2), // Use totalAmount from the order retrieved from database
            },
          },
        ],
      };
  
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });
  
      const { jsonResponse, httpStatusCode } = await handleResponse(response);
     
      console.log(jsonResponse)
      // Update order status in your database based on PayPal API response
      if (httpStatusCode === 201) {
        await Order.findOneAndUpdate({ user: userId, orderStatus: 'Pending',  orderStatus: {
          $ne: 'Completed' // Not equal to 'completed'
      },paymentMethod: 'Unknown'  }, { orderStatus: 'Pending' }); // Update order status in your database
      } else {
        await Order.findOneAndUpdate({user:userId}, { orderStatus: 'Failed' }); // Handle failure scenario
      }
  
      return { jsonResponse, httpStatusCode };
    } catch (error) {
      console.error("Failed to create PayPal order:", error);
      throw error;
    }
  };

   const handleResponse = async (response) => {
    try {
      const jsonResponse = await response.json();
      return {
        jsonResponse,
        httpStatusCode: response.status,
      };
    } catch (err) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  };





  export const CapturePaypalOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
      const {userId}=req.user
      const { jsonResponse, httpStatusCode } = await captureOrder(orderId);
      console.log(jsonResponse,httpStatusCode)
      // Update order status in your database based on PayPal API response
      if (httpStatusCode === 201) {
        await Order.findOneAndUpdate({ user: userId, orderStatus: 'Pending',  orderStatus: {
          $ne: 'Completed' // Not equal to 'completed'
      },paymentMethod: 'Unknown'  }, { paymentStatus: 'Completed',transactionDetails:jsonResponse,paymentMethod:'PayPal',orderStatus:'Processing' }); // Update order status in your database
      } else {
        await Order.findOneAndUpdate({ user:userId }, { orderStatus: 'Failed' }); // Handle failure scenario
      }
  
      res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
      console.error("Failed to capture PayPal order:", error);
      res.status(500).json({ error: "Failed to capture PayPal order." });
    }
  };



  const captureOrder = async (orderID) => {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;
     console.log(accessToken,' ',orderID)
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
        // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
        // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
        // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
      },
    });

   const httpStatusCode= response.status;
   const jsonResponse=await response.json()

   return {httpStatusCode,jsonResponse}
  

  
     
  };
  







  export const generateAccessToken = async () => {
    try {
      if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_CLIENT_SECRET) {
        throw new Error("MISSING_API_CREDENTIALS");
      }
  
      const auth = Buffer.from(
        `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
      ).toString("base64");
  
      const response = await fetch(`${base}/v1/oauth2/token`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      });
  
      if (!response.ok) {
        throw new Error(`Failed to retrieve PayPal access token: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error("Failed to generate Access Token:", error);
      throw error;
    }
  };





  export const AdminGetUserOrders=async(req,res)=>{


    try{

      const orders=await Order.find({});
      const modifiedOrders = orders.map(order => {
        const orderObject = order.toObject(); // Convert Mongoose document to plain JavaScript object
        orderObject.id = orderObject._id;
        delete orderObject._id;
        return orderObject;
      });
      res.set({
        'X-Content-Header': 'application/json',
        'X-Total-Count': modifiedOrders.length,
      });
      console.log(modifiedOrders)
  
      res.status(200).json(modifiedOrders);
  
  
  
    }catch(error){
      console.log(error)
      res.status(500).json('Internal Server Error')
  
    }


  }



  export const getUserOrders = async (req, res) => {
    try {
        const {userId} = req.user; // Assuming userId is passed as a route parameter
        const orders = await Order.find({ user:userId }); // Query orders for the specific user

        const userOrders = orders.map(order => {
            const orderObject = order.toObject(); // Convert Mongoose document to plain JavaScript object
            orderObject.id = orderObject._id;
            delete orderObject._id;
            delete orderObject.transactionDetails
            delete orderObject.user;
            delete orderObject.paymentMethod;
            orderObject.items=orderObject.items.length;
            
            return orderObject;
        });

        


        res.status(200).json(userOrders);

    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
};











