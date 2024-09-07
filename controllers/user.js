import User from "../models/UserModel.js";
import { generateAccessToken, JWTUserPasswordRecovery } from '../middlewares/auth.js';
import { generateRefreshToken,generateAdminRefreshToken } from "../middlewares/auth.js";
import { sendPasswordRecoveryEmail } from "../middlewares/nodemailer.js";
import {VerifyUserJWTToken} from '../middlewares/auth.js';
import bcrypt from 'bcrypt'


const saltRounds = 10;



export const Register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

   bcrypt.hash(password, saltRounds, async(err, hashedPassword) => {
      if (err) throw err;
      console.log(hashedPassword)
      // If user doesn't exist, proceed to create a new one
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone,
        authenticationMethod: 'local'
      });
  
      const userSaved = await user.save();
  
      // Generate tokens
      const accessToken = generateAccessToken(userSaved._id);
      const refreshToken = generateRefreshToken(userSaved._id);
  
      // Set refresh token as a cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/', // Adjust the path as needed
        maxAge: 7 * 24 * 60 * 60 * 1000, // Example: 7 days expiry
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        sameSite: 'Strict', // Adjust as per your CORS settings
      });
  
      req.userData = {
        email: userSaved.email,
        username: userSaved.name
      };
  
     const userResponse={
        email: userSaved.email,
        username: userSaved.name
      }
  
    
  
      
      res.status(201).json({ userData: userResponse, accessToken });
  
      next();
  });
 
  } catch (err) {
   
   
      next(new CustomError(err.message, 500));
    
  }
};





export const Logout=async(req,res)=>{

  try{

  
    res.clearCookie('refreshToken', {
        path: '/', // Ensure the path matches the one used while setting the cookie
        secure: process.env.NODE_ENV === 'production', // Set to true in production
         // Adjust as per your CORS settings
      });

      res.clearCookie('google-session', { path: '/' });

    res.status(200).json({ message: 'Logout successful' });

  }
  catch(err){
  
      next(new CustomError(err.message, 500));
    
  }
}
















 
export const Login = async (req, res) => {
  try {
      const { email, password } = req.body;

      
      const user = await User.findOne({ email: email,authenticationMethod:{$ne:'google' }})
          .select('name email password');

      if (user) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
              const accessToken = generateAccessToken(user._id);
              const refreshToken = generateRefreshToken(user._id);
            

              res.cookie('refreshToken', refreshToken, {
                  httpOnly: true,
                  path: '/', // Adjust the path as needed
                  maxAge: 7 * 24 * 60 * 60 * 1000, // Example: 7 days expiry
                  secure: process.env.NODE_ENV === 'production', // Set to true in production
                  sameSite: '', // Adjust as per your CORS settings
              });

              const userResponse = {
                  name: user.name,
                  email: user.email,
              };

              res.status(200).json({ modifiedUser: userResponse, accessToken });
          } else {
              res.status(401).json('Invalid password');
          }
      } else {
          res.status(404).json('User not found');
      }
  } catch (err) {
   
      next(new CustomError(err.message, 500));
    
     
  }
};













export const AdminGetUser=async(req,res)=>{

  try{

      const {userId}=req.params;
      
      const user=await User.findById(userId);
      
      const modifiedUser = user.toObject(); // Convert Mongoose document to plain JavaScript object
        modifiedUser.id = modifiedUser._id;
        delete modifiedUser._id;


        res.status(200).json(modifiedUser)





  }catch(err){
      

      next(new CustomError(err.message, 500));
    
  }
}















export const AdminGetAllUsers=async(req,res)=>{

  try{

    const filter = JSON.parse(req.query.filter || '{}');
    const range = JSON.parse(req.query.range || '[0, 10]');
    const sort = JSON.parse(req.query.sort || '["createdAt", "ASC"]');
    
    // Convert the sort array to an object for MongoDB
    const sortObject = {};
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


   
    const users=await User.find(query).sort(sortObject).skip(skip).limit(limit);
    const totalUsers = await User.countDocuments(query);



    const modifiedUsers = users.map(user => {
      const userObject = user.toObject(); // Convert Mongoose document to plain JavaScript object
      userObject.id = userObject._id;
      delete userObject._id;
      return userObject;
    });
    res.set({
     'Content-Range': `news ${range[0]}-${range[1]}/${totalUsers}`,
      'X-Total-Count': totalUsers,
    });
    

    res.status(200).json(modifiedUsers);



  }catch(err){
  
      next(new CustomError(err.message, 500));
    

  }
}


























export const UserForgotPasswoard=async(req,res)=>{


  try{
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

    const token= await JWTUserPasswordRecovery(user._id)

  
  await sendPasswordRecoveryEmail(email, token);

  res.status(200).json({ message: 'Reset link sent' });
}
catch(err){
 
 
    next(new CustomError(err.message, 500));
  
}
}































export const UserResetPassword=async(req,res)=>{


  try{
  const { token, password } = req.body;
  
   const userId=await VerifyUserJWTToken(token)
   const user=await User.findById(userId)

  if (!user) {
    return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
  }

  user.password = password;
 
  await user.save();

  res.status(200).json({ message: 'Password has been reset.' });
}
 catch(err){
  
    next(new CustomError(err.message, 500));
  
 
 }
}












