


import mongoose from "mongoose";
import { Schema } from "mongoose";
const { Decimal128 } = mongoose.Types;

const productImageSchema = new Schema({
  medium: {
    type: String,
    trim: true,
    required: false,
   
  },
  large: {
    type: String,
    trim: true,
    required: false,
   
  },
  small: {
    type: String,
    trim: true,
    required: false,
   
  }
}, { _id: false });










const optionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  option: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    get: v =>{
      
      return v ? Number(v).toFixed(2) : v;

      
      },
    set: v => {
      console.log(v)
      // Convert the value to a number, fix it to 2 decimal places, and then convert it to a string for Decimal128
      const formattedValue = Number(v).toFixed(2);
      
      return mongoose.Types.Decimal128.fromString(formattedValue);
    }
  }
  
}, { _id: false, toJSON: { getters: true }, toObject: { getters: true }  });


const ProductSchema= mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique: true,
        trim: true
    },
   brandId:{
        type:Schema.Types.ObjectId,
        ref:'Brand'
       
    },
    brand:{
        type:String,
        trim: true,
        required:true
    },
    productImage: {
      type: Schema.Types.Mixed,  // Mixed type to handle both object and string
      set: function(value) {
        // If value is not an object, set it directly as a string
        if (typeof value !== 'object') {
          return value;
        }
  
        // If large, medium, and small are not provided, return the value as a string
        if (!value.large && !value.medium && !value.small) {
          return '';
        }
  
        // Otherwise, return the object as is
        return value;
      },
      validate: {
        validator: function(value) {
          // If value is a string, it's valid
          if (typeof value === 'string') {
            return true;
          }
  
          // If value is an object, apply your validation logic
          if (typeof value === 'object' && value.large) {
            return value.medium && value.small;
          }
  
          return true;
        },
        message: 'If medium or small image is provided, large image must also be provided'
      },
      default: ''
    },
     category:{ type:[String]}
    ,
    options:{
      type:[optionSchema],
      required:true
    },
    details:{
        Description: { type: String, default: '',trim:true,required:true },
        Warnings: { type: String, default: '',trim:true },
        More: { type: String, default: '',trim:true },
        DietaryRestrictions: [String],
        Certifications: [String]
        

    }},{
        toJSON: { getters: true }, // Ensure getters are used when converting to JSON
        toObject: { getters: true } // Ensure getters are used when converting to plain object
    
  
})

ProductSchema.pre('validate', function(next) {
  this.options.forEach((option, index) => {
    option.id = index + 1; // Assign 1-based index as id
  });
  next();
});

const Product=mongoose.model('Product',ProductSchema)

export default Product;










































