import express from 'express';
import { Register,Logout,Login,AdminGetAllUsers, UserForgotPasswoard, UserResetPassword,AdminGetUser } from '../controllers/user.js';
import { verifyRefreshToken,generateAccessToken,adminAuthenticateJwt } from '../middlewares/auth.js';
import User from '../models/UserModel.js';
import { welcomeMail } from '../middlewares/nodemailer.js';



const router = express.Router();


router.post('/signup',Register,welcomeMail);
router.post('/login',Login)
router.get('/logout',Logout)
router.post('/forgot-password',UserForgotPasswoard)
router.post('/reset-password',UserResetPassword)



router.get('/',async (req, res,next) => {
    try {
        // Extract refresh token from cookie
        const refreshToken = req.cookies.refreshToken;
      console.log(refreshToken)
        if (!refreshToken) {
          return res.status(401).json({ error: 'Refresh token not found' });
        }
    
        // Verify refresh token
        const decoded =await verifyRefreshToken(refreshToken).then((decoded)=>decoded);
        console.log(decoded)
        const accessToken = generateAccessToken(decoded.userId);

        const user=await User.findById(decoded.userId)
  
      // Respond with the new access token
    
      res.status(200).json({ name: user.name,profilePicture:user.picturePath,email:user.email,accessToken:accessToken });
       
        if (!decoded) {
          return res.status(403).json({ error: 'Invalid or expired refresh token' });
        }
    
        // If refresh token is valid, generate a new access token
        
      } catch (err) {
        next(new CustomError(err.message, 500));

      }
   
       
    
   });





//admin routes
router.get('/show',adminAuthenticateJwt,AdminGetAllUsers)
router.get('/show/:userId',adminAuthenticateJwt,AdminGetUser)









export default router;




