
import Address from "../models/AddressModel.js";
import Cart from "../models/CartModel.js";
import Order from "../models/OrderModel.js"
import Product from "../models/ProductModel.js";
import StateTax from "../models/TaxModel.js";
import User from "../models/UserModel.js";
import { orderCreatedMail } from "../middlewares/nodemailer.js";
import CustomError from "../utils/ErrorClass.js";





















 export const OrderTaxRate=async (req,res,next) =>{

  try{

    const { userId } = req.user; 
    const address=await Address.findOne({user:userId}).select('stateCode')

  
    const taxRate=await StateTax.findOne({state:address.stateCode}).select('total_rate')

    const order = await Order.findOne({ user: userId, orderStatus: 'Pending',  orderStatus: {
      $ne: 'Completed' // Not equal to 'completed'
  },paymentMethod: 'Unknown'  })
  
 
   if(order){ 
    const Tax=Number(order.itemsAmount)*Number(taxRate.total_rate);
    const totalAmount=Number(order.itemsAmount)+Tax;
    console.log('t',Tax,totalAmount)
      order.totalAmount = totalAmount;
      order.tax= Tax;
      order.updatedAt = new Date(); 
    const savedOrder=  await order.save();
  

      res.status(200).json('Order found')
   }
   else
   {
    res.status(404).json('Order not found')
   }






  }catch(err){
    
    next(new CustomError(err.message,500))
}


 }





























const base = "https://api-m.sandbox.paypal.com";

export const CreateUserOrder = async (req, res,next) => {
  try {
   
    const { userId } = req.user; 
   
    const cart = await Cart.findOne({ user: userId }).select('items');
    const address=await Address.findOne({user:userId}).select('stateCode')
    
    if (cart.items.length === 0) {
      return res.status(404).json({ error: 'Cart not found for user' });
    }

    
    if(cart.items.length !== 0){
    const itemsWithPrices = await Promise.all(cart.items.map(async (item) => {
      
      const product = await Product.findById(item.product).select('options');
     console.log('a',product)
      const selectedOption = product.options.find(option => option.id === item.option);
      console.log(selectedOption.price)
      return {
        product: item.product,
        quantity: item.quantity,
        option:item.option,
        price: selectedOption ? selectedOption.price : 0, // Get price from product model
      };
    }));

    







   const taxRate=await StateTax.findOne({state:address.stateCode})
  
   
    const itemsAmount = calculateTotalAmount(itemsWithPrices);
   


       
      
       const Tax=itemsAmount*taxRate.total_rate;
       
       const totalAmount=itemsAmount+Tax;
     

      
     
      
      
    
   
    
    
    




    






    
    const existingOrder = await Order.findOne({ user: userId, orderStatus: 'Pending',  orderStatus: {
      $ne: 'Completed' 
  },paymentMethod: 'Unknown'  }).select('items totalAmount itemsAmount tax updateAt');

    if (existingOrder) {
      
      existingOrder.items = itemsWithPrices;
      existingOrder.totalAmount = totalAmount;
      existingOrder.itemsAmount=itemsAmount;
      existingOrder.tax= Tax;
      existingOrder.updatedAt = new Date(); 
      await existingOrder.save();

     
      cart.items = [];
      await cart.save();

      return res.status(201).json(existingOrder);
    }

    // Prepare new order data
    const orderData = {
      orderNumber: generateOrderNumber(), // Function to generate a unique order number
      user: userId,
      items: itemsWithPrices,
      itemsAmount:itemsAmount,
      tax:Tax,
      paymentMethod: 'Unknown',
      paymentStatus: 'Pending',
      orderStatus: 'Pending',
      totalAmount: totalAmount ,
    };

    // Create new order
    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();
    
    const orderResponse={
      items:savedOrder.items,
      totalAmount:savedOrder.totalAmount,
      itemsAmount:savedOrder.itemsAmount,
      tax:savedOrder.Tax
    }
    // Clear the user's cart after creating the order
    cart.items = [];
    await cart.save();
    res.status(201).json(savedOrder);
}
   
  } catch(err){
    
    next(new CustomError(err.message,500))
}
};


function generateOrderNumber() {
    return 'lx' + Math.random().toString(36).substr(2, 8) + '-' + Math.random().toString(36).substr(2, 6);
  }
  
  // Helper function to calculate total amount based on cart items
  function calculateTotalAmount(items) {
    const itemsAmount= items.reduce((total, item) => total + item.price * item.quantity, 0);
    
    return itemsAmount;
  }




































  export const getUserOrder = async (req, res,next) => {
    try {
      // Assuming req.user is populated with user data by authMiddleware
      const { userId } = req.user;
  
      // Find the user's order
      const order = await Order.findOne({
        user: userId,
        orderStatus: { $ne: 'Completed' }, // Exclude completed orders
        paymentMethod: 'Unknown',
      }).populate({path: 'items.product',  
        select: 'options productImage name brand'});
     
      if (!order) {
        return res.status(404).json({ error: 'Order not found for user' });
      }
    
      // Extract only price and option for each item
      const items = order.items.map((item) => {
        // Find the matching option in the product's options array
       
        const selectedOption = item.product.options.find(select => select.id === item.option);
       
        // If a matching option is found, return the object with the desired fields
        if (selectedOption) {
          return {
            product:{
            price: selectedOption.price,
            option: selectedOption.option,
            productImage: item.product.productImage,
            name:item.product.name,
            brand:item.product.brand,
            _id:item.product._id,
  
            }
          };
        }
      
        // If no matching option is found, you can decide what to return, for example:
     
      });
      
  
      // Construct the response with only the necessary fields
      const response = {
        orderNumber: order.orderNumber,
        user: order.user,
        items, // Only price and option fields are included
        tax: order.tax,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        totalAmount: order.totalAmount,
        itemsAmount: order.itemsAmount,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      };
     
  
      res.status(200).json(response);
    } catch(err){
    
      next(new CustomError(err.message,500))
  }
  };







  




  export const CreatePaypalOrder = async (req,res,next) => {
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
    } catch(err){
    
      next(new CustomError(err.message,500))
  }
  };
  
  const createOrder = async (userId) => {
    try {
      const order=await Order.findOne({ user: userId, orderStatus: 'Pending',  orderStatus: {
        $ne: 'Completed' // Not equal to 'completed'
    },paymentMethod: 'Unknown'  }).select('totalAmount');
      
      const accessToken = await generateAccessToken();
      const url = `${base}/v2/checkout/orders`;
      const payload = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: order.totalAmount, // Use totalAmount from the order retrieved from database
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
     
      
      if (httpStatusCode === 201) {
        await Order.findOneAndUpdate({ user: userId, orderStatus: 'Pending',  orderStatus: {
          $ne: 'Completed' // Not equal to 'completed'
      },paymentMethod: 'Unknown'  }, { orderStatus: 'Pending' }); // Update order status in your database
         
     



      } else {
        await Order.findOneAndUpdate({user:userId}, { orderStatus: 'Failed' }); // Handle failure scenario
      }
  
      return { jsonResponse, httpStatusCode };
    } catch(err){
    
      (new CustomError(err.message,500))
  }
  };

   const handleResponse = async (response) => {
    try {
      const jsonResponse = await response.json();
      return {
        jsonResponse,
        httpStatusCode: response.status,
      };
    } catch(err){
    
      (new CustomError(err.message,500))
  }
  };





  export const CapturePaypalOrder = async (req, res,next) => {
    try {



      const { orderId } = req.params;
      const {userId}=req.user
      const { jsonResponse, httpStatusCode } = await captureOrder(orderId);
      
      if (httpStatusCode === 201) {
      const order=  await Order.findOneAndUpdate({ user: userId, orderStatus: 'Pending',  orderStatus: {
          $ne: 'Completed' // Not equal to 'completed'
      },paymentMethod: 'Unknown'  }, { paymentStatus: 'Completed',transactionDetails:jsonResponse,paymentMethod:'PayPal',orderStatus:'Processing' }); // Update order status in your database

      const user =await User.findById(userId);

      const date = new Date(order.updatedAt);

      // Get the date in the format YYYY-MM-DD
      const formattedOrderDate = date.toISOString().split('T')[0];
        
       orderCreatedMail(user.name,user.email,order.orderNumber,formattedOrderDate,order.totalAmount)
      } else {
        await Order.findOneAndUpdate({ user:userId }, { orderStatus: 'Failed' }); // Handle failure scenario
      }
  
      res.status(httpStatusCode).json(jsonResponse);
    } catch(err){
    
      next(new CustomError(err.message,500))
  }
  };



  const captureOrder = async (orderID) => {

    try{

    
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;
    
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
  }
  catch(err){
    
    next(new CustomError(err.message,500))
}
  

  
     
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
    } catch(err){
    
      next(new CustomError(err.message,500))
  }
  };





  export const AdminGetUserOrders = async (req, res,next) => {
    try {
      // Extract filter, range, and sort parameters from the query
      const filter = JSON.parse(req.query.filter || '{}');
      const range = JSON.parse(req.query.range || '[0, 10]');
      const sort = JSON.parse(req.query.sort || '["createdAt", "ASC"]');
      
      // Convert the sort array to an object for MongoDB
      const sortObject = { };
      sortObject[sort[0]] = sort[1] === 'DESC' ? -1 : 1;
  
      // Extract pagination parameters
      const skip = range[0];
      const limit = range[1] - range[0] + 1;
  
      // Build the query based on filter
      const query = {};
      if (filter) {
        for (const key in filter) {
          if (filter.hasOwnProperty(key)) {
            // Check if the value is a number or a string
            if (!isNaN(filter[key])) {
              query[key] = filter[key]; // Direct match for numeric fields
            } else {
              query[key] = { $regex: new RegExp(filter[key], 'i') }; // Case-insensitive search for string fields
            }
          }
        }
      }
  

    
      const orders = await Order.find(query).sort(sortObject).skip(skip).limit(limit);
      const totalOrders = await Order.countDocuments(query);
  
      
      const modifiedOrders = orders.map(order => {
        const orderObject = order.toObject(); 
        orderObject.id = orderObject._id;
        delete orderObject._id;
        return orderObject;
      });
  
      res.set({
        'Content-Range': `orders ${range[0]}-${range[1]}/${totalOrders}`,
        'X-Total-Count': totalOrders,
      });
  
      res.status(200).json(modifiedOrders);
    } catch(err){
    
      next(new CustomError(err.message,500))
  }
  };








  export const getUserOrders = async (req, res,next) => {
    try {
        const {userId} = req.user; // Assuming userId is passed as a route parameter
        const orders = await Order.find({ user:userId }); // Query orders for the specific user
        console.log(orders)
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

    } catch(err){
    
      next(new CustomError(err.message,500))
  }
};





















export const AdminGetOrder=async(req,res,next)=>{

  try{

      const {orderId}=req.params;

      const order=await Order.findById(orderId);
      const modifiedOrder = order.toObject(); // Convert Mongoose document to plain JavaScript object
        modifiedOrder.id = modifiedOrder._id;
        delete modifiedOrder._id;


        res.status(200).json(modifiedOrder)





  }catch(err){
    
    next(new CustomError(err.message,500))
}
}















export const AdminModifyOrders=async(req,res,next)=>{

  try{

      const data=req.body;
      const {orderId} =req.params;

      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      // Overwrite product fields with the fields from req.body
      Object.keys(data).forEach(key => {
        order[key] = data[key];
      });
  
      // Save the updated product
      const updatedOrder = await order.save();


  
     const modifiedOrder = updatedOrder.toObject(); // Convert Mongoose document to plain JavaScript object
        modifiedOrder.id = modifiedOrder._id;
        delete modifiedOrder._id;


        res.status(200).json(modifiedOrder)






  }

  catch(err){
    
      next(new CustomError(err.message,500))
  }
}

