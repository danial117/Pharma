import User from "../models/UserModel.js";
import { generateAccessToken, JWTUserPasswordRecovery } from '../middlewares/auth.js';
import { generateRefreshToken,generateAdminRefreshToken } from "../middlewares/auth.js";
import { sendPasswordRecoveryEmail } from "../middlewares/nodemailer.js";
import {VerifyUserJWTToken} from '../middlewares/auth.js';







export const Register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    // If user doesn't exist, proceed to create a new one
    const user = new User({
      name: name,
      email: email,
      password: password,
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

    res.status(201).json({ userData: userSaved, accessToken });

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
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
  catch(error){
    res.status(501).json('Internal Server Error')
  }
}





 

 export const Login=async(req,res)=>{
    try{
      const {email,password} =req.body;

    console.log(req.body)
    const user=await User.findOne({email:email});

    if(user ){
        if(user.password === password){
            const accessToken = generateAccessToken(user._id);
            const refreshToken = generateRefreshToken(user._id);
          console.log(refreshToken)
            res.cookie('refreshToken', refreshToken, {
              httpOnly: true,
              path: '/', // Adjust the path as needed
              maxAge: 7 * 24 * 60 * 60 * 1000, // Example: 7 days expiry
              secure: process.env.NODE_ENV === 'production', // Set to true in production
              sameSite: '', // Adjust as per your CORS settings
            });
           
            res.status(200).json({modifiedUser:user,accessToken})
           
        }
    }else{
        res.status(301)
    }
    }catch(error){
        console.log(error);
    }
}










export const AdminGetAllUsers=async(req,res)=>{

  try{

    const users=await User.find({});
    const modifiedUsers = users.map(user => {
      const userObject = user.toObject(); // Convert Mongoose document to plain JavaScript object
      userObject.id = userObject._id;
      delete userObject._id;
      return userObject;
    });
    res.set({
      'X-Content-Header': 'application/json',
      'X-Total-Count': modifiedUsers.length,
    });
    

    res.status(200).json(modifiedUsers);



  }catch(error){
    console.log(error)
    res.status(500).json('Internal Server Error')

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
catch(error){
  console.log(error)
  res.status(501).json('Internal Server Error')
}
}






export const UserResetPassword=async(req,res)=>{


  try{
  const { token, password } = req.body;
   console.log(req,password)
   const userId=await VerifyUserJWTToken(token)
   const user=await User.findById(userId)

  if (!user) {
    return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
  }

  user.password = password;
 
  await user.save();

  res.status(200).json({ message: 'Password has been reset.' });
}
 catch(error){
  res.status(501).json('Internal Server Error')
  console.log(error)
 }
}












