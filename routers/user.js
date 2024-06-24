import express from 'express';
import { Register,Logout,Login,AdminGetAllUsers } from '../controllers/user.js';
import { verifyRefreshToken,generateAccessToken } from '../middlewares/auth.js';
import User from '../models/UserModel.js';

const router = express.Router();


router.post('/signup',Register);
router.post('/login',Login)
router.get('/logout',Logout)
router.get('/show',AdminGetAllUsers)
router.get('/',async (req, res) => {
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
    
      res.json({ name: user.name,profilePicture:user.picturePath,email:user.email,accessToken:accessToken });
       
        if (!decoded) {
          return res.status(403).json({ error: 'Invalid or expired refresh token' });
        }
    
        // If refresh token is valid, generate a new access token
        
      } catch (error) {
        console.error('Error refreshing token:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
   
       
    
   });


export default router;




