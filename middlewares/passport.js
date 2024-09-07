// passportConfig.js
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/UserModel.js';
import dotenv from 'dotenv'
import { newUserMail } from './nodemailer.js';
import CustomError from '../utils/ErrorClass.js';

dotenv.config()

passport.use(new GoogleStrategy({ 
  clientID: process.env.goggleClientId,
  clientSecret: process.env.goggleClientSecret, 
  callbackURL: process.env.NODE_ENV==='production'?'https://www.infovit.us/api/oauth2/redirect/google/':'http://localhost:3002/oauth2/redirect/google/',
  passReqToCallback: true,
  accessType: 'offline', // Ensures refresh token is issued
  prompt: 'consent' // Forces the consent screen to show
}, 
async function(request, accessToken, refreshToken, profile, done) {
   
   
   try {
    // Use the profile information to check if the user already exists in the database
    const existingUser = await User.findOne({ email: profile.emails[0].value });

    // If the user already exists, return that user
    if (existingUser) {
     
      existingUser.accessToken = accessToken;
      if (refreshToken) {
        existingUser.refreshToken = refreshToken;
      }
      await existingUser.save();
      return done(null, existingUser);
    } else {
      const newUser = new User({ 
        name: profile.displayName,
        email: profile.emails[0].value,
        picturePath: profile.photos[0].value,
        googleId: profile.id,
        authenticationMethod: 'google',
        accessToken: accessToken,
        refreshToken: refreshToken,
      });



      const savedUser=await newUser.save();
      newUserMail(savedUser.name,savedUser.email)
      return done(null, newUser);
    }
  } catch (err) { 
    done(new CustomError(err.message, 500));
 
  }
}));

passport.serializeUser((user, done) => {
 
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (user) {
      done(null, user);
    } else {
      done(new Error('User not found'));
    }
  } catch (err) {
    (new CustomError(err.message, 500));

  }
});

export default passport;
