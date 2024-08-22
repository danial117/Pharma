import mongoose from "mongoose";
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Replace with your actual User schema
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim:true
  },
  firstName: {
    type: String,
    required: true,
    trim:true
  },
  lastName: {
    type: String,
    required: true,
    trim:true
  },
  streetAddress: {
    type: String,
    required: true,
    trim:true
  },
  state: {
    type: String,
    required: true,
    trim:true
  },
  stateCode:{
    type: String,
    required: true,
    trim:true
  },
  city: {
    type: String,
    required: true,
    trim:true
  },
  zip: {
    type: String, // Assuming zip code is a string; adjust data type as needed
    trim:true,
    required:true
   
  },
});

const Address = mongoose.model('Address', addressSchema);

export default Address;