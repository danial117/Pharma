import jwt from "jsonwebtoken";
import User from '../models/UserModel.js';
// Generate Access Token
export const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
};

// Generate Refresh Token
export const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

export const generateAdminRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '1d' });
};

// Verify Access Token
export const verifyAccessToken = (req, res, next) => {

  try{

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  
    if (!token) {
      return res.status(401).json({ error: 'Access token not provided' });
    }
  
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
      if (err) {
        console.error('Access token verification error:', err);
        return res.status(403).json({ error: 'Access token invalid' });
      }
      req.user = decoded; // Attach decoded user information to the request object
      
      next();
    });
  }
  catch(error){
    res.status(501).json('Internal Server Error')
  }
  };
  
  // Verify Refresh Token
  export const verifyRefreshToken = (token) => {

    try{

   
    return new Promise((resolve, reject) => {
      if (!token) {
        console.log('No token');
        return reject(new Error('No token provided'));
      }
  
      jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err) {
          console.error('Refresh token verification error:', err);
          return reject(err);
        }
       
        resolve(decoded);
      });
    });
  }
  catch(error){
    res.status(501).json('Internal Server Error')
  }
  };








  



  const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      const token = authHeader.split(' ')[1];
  
      jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };
  
  const refreshToken = async (req, res, next) => {
    const { refreshToken } = req.cookies;
  
    if (!refreshToken) {
      return res.sendStatus(401);
    }
  
    try {
      const user = await User.findOne({ refreshToken });
      if (!user) {
        return res.sendStatus(403);
      }
  
      // Exchange refresh token for a new access token
      const response = await axios.post('https://oauth2.googleapis.com/token', {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      });
  
      user.accessToken = response.data.access_token;
      await user.save();
  
      req.user = user;
      next();
    } catch (error) {
      console.error('Error refreshing token:', error);
      res.sendStatus(500);
    }
  };








 export const VerifyUserJWTToken=async(token)=>{
  console.log(token)
  const data= jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) {
      console.error('Access token verification error:', err);
      
    }
    
    return decoded.userId
    
    
  })

  return data
 }





  

  export const adminAuthenticateJwt = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
       
        const user = await User.findById(decoded.userId);
       
        if (!user || !user.isAdmin) {
            return res.status(403).json({ message: 'Access denied' });
        }
        else{
          req.user = user;
        next();

        }
       
        
    } catch (err) {
      console.log(err)
        res.status(401).json({ message: 'Invalid token' });
    }
};








export const JWTUserPasswordRecovery=async(userId)=>{
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '4h' });
}