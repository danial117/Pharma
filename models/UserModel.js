
import mongoose from "mongoose";

const UserSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
   email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
       
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
      }
    },
  { timestamps: true }
)

const User=mongoose.model('User',UserSchema)

export default User;
















