


import mongoose from "mongoose";
import { Schema } from "mongoose";

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
        trim: true
    },
    productImage: {
        medium: {
          type: String,
          trim: true,
        },
        large: {
          type: String,
          trim: true,
        },
        small:{
            type: String,
          trim: true,

        }
      },
    options:{
        type:String,
        trim: true

    },
     category:{ type:[String]}
    ,
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        get: v => v ? parseFloat(v.toString()).toFixed(2) : undefined,
        set: v => v ? mongoose.Types.Decimal128.fromString(v) : undefined // Optional: Convert string to Decimal128
    },
    details:{
        Description: { type: String, default: '' },
        Warnings: { type: String, default: '' },
        More: { type: String, default: '' },
        DietaryRestrictions: [String],
        Certifications: [String]
        

    }},{
        toJSON: { getters: true }, // Ensure getters are used when converting to JSON
        toObject: { getters: true } // Ensure getters are used when converting to plain object
    
  
})

const Product=mongoose.model('Product',ProductSchema)

export default Product;










































