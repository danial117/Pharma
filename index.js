import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import UserRouter from './routers/user.js'
import ProductRouter from './routers/product.js'
import CartRouter from './routers/cart.js'
import path from "path";
import OrderRouter from './routers/order.js'
import { fileURLToPath } from 'url';
import ContentRouter from './routers/content.js'
import AddressRouter from './routers/address.js'
import session from 'express-session'
import User from './models/UserModel.js';
import AdminRouter from './routers/admin.js'
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import { verifyRefreshToken,generateAccessToken, generateRefreshToken } from './middlewares/auth.js';
import passport from './middlewares/passport.js';
import BrandRouter from './routers/brand.js'
import NewsRouter from './routers/news.js'
import ContactRouter from './routers/customerContact.js'




dotenv.config()
const app=express();

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);


app.use("/assets/products/lg", express.static(path.join(__dirname, "public/products/large")));
app.use("/assets/products/md", express.static(path.join(__dirname, "public/products/medium")));
app.use("/assets/products/sm", express.static(path.join(__dirname, "public/products/small")));
app.use("/assets/brands", express.static(path.join(__dirname, "public/brands")));
app.use("/assets/news", express.static(path.join(__dirname, "public/news")));


const allowedOrigins=process.env.ALLOWED_ORIGINS.split(',');


app.use(cors({ origin: allowedOrigins, credentials: true }));
  app.use(helmet()); 
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
  app.use(morgan('common'));
  app.use(cookieParser());
  app.use(session({
    key: 'google-session', // Set a custom key for the session
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/Info', // replace with your MongoDB connection string
      ttl: 14 * 24 * 60 * 60, // session TTL (optional)
    }),
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    
  }));
  
  app.use(express.json()); 
  app.use(express.urlencoded({  extended: true }));
  



  app.use(passport.initialize());
app.use(passport.session());












  



/* ROUTES WITH FILES */
app.get('/oauth2/redirect/google/',
  passport.authenticate('google', { scope:
  	[ 'email', 'profile' ],
    accessType: 'offline', // Ensures refresh token is issued
    prompt: 'consent', // Forces the consent screen to show
    session: false 
    }   ),(req, res) => {
      const refreshToken=generateRefreshToken(req.user._id)
      res.clearCookie('refreshToken');
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production', // Ensure secure cookie in production
       
      });
      res.redirect(process.env.NODE_ENV==='production'?'https://www.infovit.us':'http://localhost:3000');
    })
    ;




 

    app.get('/refresh-token', async (req, res) => {
      try {
        // Extract refresh token from cookie
        const refreshToken = req.cookies.refreshToken;
      console.log(refreshToken)
        if (!refreshToken) {
          return res.status(401).json({ error: 'Refresh token not found' });
        }
    
        // Verify refresh token
        const decoded = verifyRefreshToken(refreshToken).then((decoded)=>decoded).then((decoded)=>{
          
          const accessToken = generateAccessToken(decoded.userId);
    
        // Respond with the new access token
        res.status(200).json({ accessToken });

        })
       
        if (!decoded) {
          return res.status(403).json({ error: 'Invalid or expired refresh token' });
        }
    
        // If refresh token is valid, generate a new access token
        
      } catch (error) {
        console.error('Error refreshing token:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });




app.use('/user',UserRouter);
app.use('/products',ProductRouter);
app.use('/cart',CartRouter)
app.use('/order',OrderRouter)
app.use('/address',AddressRouter)
app.use('/content',ContentRouter)
app.use('/brands',BrandRouter)
app.use('/admin',AdminRouter)
app.use('/news',NewsRouter)
app.use('/contact',ContactRouter)



const PORT = process.env.PORT 
const MONGO_URI=process.env.MONGO_URI 
mongoose 
  .connect(MONGO_URI)
  .then(() => {
    console.log('connected to MONGO DB')
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);  
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));



// InsertProduct()


User.deleteMany({})
