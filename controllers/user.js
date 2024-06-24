import User from "../models/UserModel.js";
import { generateAccessToken } from '../middlewares/auth.js';
import { generateRefreshToken } from "../middlewares/auth.js";



export const Register=async(req,res)=>{
    try{

    
    const {name,email,password,phone}=req.body;
    const user= await new User({
     name:name, 
     email:email, 
     password:password,
     phone:phone,
     authenticationMethod:'local'    
    });
  const userSaved= await user.save()
  const accessToken = generateAccessToken(userSaved._id);
  const refreshToken = generateRefreshToken(userSaved._id);

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    path: '/', // Adjust the path as needed
    maxAge: 7 * 24 * 60 * 60 * 1000, // Example: 7 days expiry
    secure: process.env.NODE_ENV === 'production', // Set to true in production
    sameSite: '', // Adjust as per your CORS settings
  });
  console.log(userSaved,accessToken)
  res.status(201).json({userData:userSaved,accessToken})
}
catch(error){
    console.log(error)
}
 }





export const Logout=async(req,res)=>{

    res.clearCookie('refreshToken', {
        path: '/', // Ensure the path matches the one used while setting the cookie
        secure: process.env.NODE_ENV === 'production', // Set to true in production
         // Adjust as per your CORS settings
      });

      res.clearCookie('google-session', { path: '/' });

    res.status(200).json({ message: 'Logout successful' });

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
    console.log(modifiedUsers)

    res.status(200).json(modifiedUsers);



  }catch(error){
    console.log(error)
    res.status(500).json('Internal Server Error')

  }
}








