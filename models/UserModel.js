
import mongoose from "mongoose";

const UserSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    isAdmin:{
      type:Boolean,
      default:false
    },
    isSuperAdmin:{
      type:Boolean,
      default:false
    },
   email:{
        type:String,
        required:true,
        unique:true,
        trim: true
    },
    phone:{
        type:String,
        trim:true
       
    }, 
    password: {
        type: String,
        required: function () {
          // Require password only if authenticationMethod is 'local'
          return this.authenticationMethod === 'local';
        },
      },
      picturePath: {
        type: String,
        trim: true,
        default: "",
      }, googleId: {
        type: String, // For Google users
      },
      authenticationMethod: {
        type: String,
        enum: ['local', 'google'],
        required: true,

      },
      accessToken:{
        type:String
      },
      refreshToken:{
        type:String
      },
      otp: {
         type: String
      },
      otpExpires: {
         type: Date 
        }
    },
  { timestamps: true }
)

const User=mongoose.model('User',UserSchema)

export default User;
















