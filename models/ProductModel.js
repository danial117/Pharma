


import mongoose from "mongoose";

const ProductSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
   brand:{
        type:String,
       
    },
    productImage:{
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










































