


import mongoose from "mongoose";
import { Schema } from "mongoose";
const ProductSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
   brandId:{
        type:Schema.Types.ObjectId,
        ref:'Brand'
       
    },
    brand:{
        type:String,
    },
    productImage:{
         type:String
    },
    option:{
        type:String

    },
    price:{
        type:Number,
        required:true
    },
    details:{
        Description:String,
        Warnings:String,
        DietaryRestrictions: [String],
        Certifications: [String],
        More:String

    }
  
})

const Product=mongoose.model('Product',ProductSchema)

export default Product;










































