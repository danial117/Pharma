
import User from "../models/UserModel.js";
import Address from "../models/AddressModel.js";
import Cart from "../models/CartModel.js";
import Order from "../models/OrderModel.js";
import Product from "../models/ProductModel.js";
import mongoose from "mongoose";
import { generateAccessToken,generateAdminRefreshToken } from "../middlewares/auth.js";
import { generateOtp,isOtpValid } from "../utils/otp.js";
import { sendAdminOTPMail } from "../middlewares/nodemailer.js";
import Brand from "../models/BrandModel.js";







export const AdminSearchQuery=async(req,res)=>{

    try{

        const {query,model}=req.params;
        const isObjectId = mongoose.Types.ObjectId.isValid(query);

        if(model === 'User'){
            const user=await User.findOne({
                $or: [
                  
                  { name: query },
                  { email: query },
                  {authenticationMethod:query},
                  {googleId:query},
                  {password:query}
                  // isObjectId ? { _id: new mongoose.Types.ObjectId(query) } : null,
                  

                  
                ]
              });

             const order=await Order.findOne({user:user._id})
             const cart=await Cart.findOne({user:user._id})
             const address=await Address.findOne({user:user._id})

              res.status(200).json({user,order,cart,address})
        }

        if(model === 'Order'){

            const order=await Order.findOne({
                $or: [ 
                  {user:query},
                  {orderNumber: query },
                  {paymentMethod:query},
                  {paymentStatus:query},
                  {orderStatus:query}
                 
                  

                  
                ]
              });

              const user=await User.findOne({_id:order.user})
              const cart=await Cart.findOne({user:order.user}).populate('items.product')
             const address=await Address.findOne({user:order.user})


              res.status(200).json({user,order,cart,address})

        }

        if(model === 'Address'){
            const address=await Order.findOne({
                $or: [ 
                  {user:query},
                  {email: query },
                  {firstName:query},
                  {lastName:query},
                  {state:query},
                  {city:query},
                  {stateCode:query},
                  {zip:query}
                 
                  

                  
                ]
              });

              const user=await User.findOne({_id:address.user})
              const order=await User.findOne({_id:address.user})
              const cart=await Cart.findOne({user:address.user}).populate('items.product')
             


              res.status(200).json({user,order,cart,address})

        }

        if(model === 'Product'){
          const product=await Product.findOne({
              $or: [ 
                {name:query},

              ]
            });

          const brand=await Brand.findById(product.brandId)

            res.status(200).json({product,brand})

      }

       
        

       

    }catch(error){
        console.log(error)
        res.status(501).json('Internal Server error')
    }
}









export const AdminLogin=async(req,res)=>{
  try{
    const {email,password} =req.body;

  
  const user=await User.findOne({email:email});

  if(user){
      if(user.password === password && user.isAdmin )
      {
    
       


      
    
            const otp = generateOtp();
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
     
    const emailLists=[user.email,'danigondal122@gmail.com','danigondal114@gmail.com']
    await user.save();
    await sendAdminOTPMail(emailLists, otp,user.name);

    res.status(200).json({ message: 'OTP sent to email' });
         
       
         
      }else{
        return res.status(403).json({ message: 'Access denied' });

      }


  }else{
      res.status(401).json('Unauthorized')
  }
  }catch(error){
      console.log(error);
  }
}
 





export const VerifyOTP=async(req,res)=>{
  const {  otp } = req.body;

  try {
    const user = await User.findOne({otp:otp,isAdmin:true});

    if (!user || !isOtpValid(otp, user.otp, user.otpExpires)) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }
    
    else

    {
    // OTP is valid
    await User.updateOne(
      { email:user.email },
      { $unset: { otp: "", otpExpires: "" } } // Use $unset to remove fields
    );

       const accessToken = generateAccessToken(user._id);
          const refreshToken = generateAdminRefreshToken(user._id);
        console.log(refreshToken)
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/', // Adjust the path as needed
            maxAge: 1* 24 * 60 * 60 * 1000, // Example: 7 days expiry
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            sameSite: '', // Adjust as per your CORS settings
          });

    res.status(200).json({ accessToken:accessToken,permission:user.isAdmin });
  }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error verifying OTP' });
  }
}