import mongoose from "mongoose";

// Define the schema for the brand
const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true
    },
    brandLogoPath: {
        type: String,
        trim: true
        
    }
});

// Create a model based on the schema
const Brand = mongoose.model('Brand', brandSchema);
export default Brand