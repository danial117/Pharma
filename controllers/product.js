
import Brand from "../models/BrandModel.js";
import Product from "../models/ProductModel.js";
import { compressAndSaveProductImage } from "../utils/compressImages.js";
import path from 'path'
import { fileURLToPath } from 'url';
import fs from 'fs'
// Get current file directory
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);








export const GetProducts=async(req,res)=>{


try{
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided
    const type = req.query.type;
    console.log(type)
    const skip = (page - 1) * limit;

    if (type) {
      let query = {};
      // If type parameter is provided, use regex to match products containing the type in their name
      query = { name: { $regex: type, $options: 'i' },$nor: [
        { productImage: { $type: "string" } },
        { productImage: "" }
      ]}; // 'i' option for case-insensitive search
      const products = await Product.find(query).skip(skip).limit(limit);
      console.log(products)
     
      res.status(200).json(products);
    
  
    }else
{
    // Calculate the number of documents to skip
    

    const products=await Product.find({ $nor: [
      { productImage: { $type: "string" } },
      { productImage: "" }
    ] }).skip(skip).limit(limit);
  
   

      res.status(200).json(products)
   
    
}

}
catch(error){
    console.log(error)
}


}






export const SearchProductCategory = async (req, res) => {
  try {
    const { search } = req.params;
    const words = search.trim().toLowerCase().split(/\s+/);
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided
  
    const skip = (page - 1) * limit;

    // Escape special characters for regex safety
    const escapedWords = words.map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

    // Create a regex pattern to match the exact phrases or words
    const pattern = new RegExp(`\\b${escapedWords.join('\\b.*?\\b')}\\b`, 'i'); // 'i' for case-insensitive
    
    const results = await Product.find({
      $nor: [
        { productImage: { $type: "string" } },
        { productImage: "" }
      ],
      category: {
        $elemMatch: {
          $regex: pattern
        }
      }
    }).skip(skip).limit(limit);
   console.log(results)
    res.status(200).json(results);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'An error occurred while searching for products.' });
  }
};











export const SearchProduct=async(req,res)=>{
        try {
          // Parse query parameters
          const { product,  page = 1, limit = 10 } = req.query;
      
          // Initialize query object
          const query = {};
      
          // Add search conditions to query object
          if (product) {
            query.name = { $regex: product, $options: 'i' }; // Case-insensitive regex search
          }
         
      
          // Calculate the number of documents to skip
          const skip = (parseInt(page) - 1) * parseInt(limit);
      
          // Retrieve products from the database with pagination and search
          const products = await Product.find({...query,$nor: [
            { productImage: { $type: "string" } },
            { productImage: "" }
          ]}).skip(skip).limit(parseInt(limit));
      
          // Get the total number of matching products to calculate total pages
          const totalProducts = await Product.countDocuments(query);
          const totalPages = Math.ceil(totalProducts / parseInt(limit));
      
          // Send the paginated results along with additional information
         

            res.status(200).json({products:products});

          
          
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      };






export const GetProduct=async(req,res)=>{
    
  try{
    const {productId}=req.params
    const product=await Product.findById(productId)
    
  
    if(product && typeof product.productImage !=='string')
    {
       res.status(200).json(product)
      }
      else{
        res.status(404).json('Not Found')
      }
  }
  catch(err){
    console.log(err)
    res.status(501)
  }
}













  export const AdminGetUserProducts = async (req, res) => {
    try {
      // Extract filter, range, and sort parameters from the query
      const filter = JSON.parse(req.query.filter || '{}');
      const range = JSON.parse(req.query.range || '[0, 10]');
      const sort = JSON.parse(req.query.sort || '["createdAt", "ASC"]');
      
      // Convert the sort array to an object for MongoDB
      const sortObject = {};
      sortObject[sort[0]] = sort[1] === 'DESC' ? -1 : 1;
  
      // Extract pagination parameters
      const skip = range[0];
      const limit = range[1] - range[0] + 1;
  
      // Build the query based on filter
      const query = {};
      if (filter) {
        for (const key in filter) {
          if (filter.hasOwnProperty(key)) {
            // Check if the value is a number or a string
            if (!isNaN(filter[key])) {
              query[key] = filter[key]; // Direct match for numeric fields
            } else {
              query[key] = { $regex: new RegExp(filter[key], 'i') }; // Case-insensitive search for string fields
            }
          }
        }
      }
  
      console.log(query)
      // Find orders based on the filter, sort, skip, and limit
      const products = await Product.find(query).sort(sortObject).skip(skip).limit(limit);
      const totalProducts = await Product.countDocuments(query);
  
      
      const modifiedProducts = products.map(product => {
        const productObject = product.toObject(); // Convert Mongoose document to plain JavaScript object
        productObject.id = productObject._id;
        delete productObject._id;
        return productObject;
      });
  
      res.set({
        'Content-Range': `orders ${range[0]}-${range[1]}/${totalProducts}`,
        'X-Total-Count': totalProducts,
      });
  
      res.status(200).json(modifiedProducts);
    } catch (error) {
      console.log(error);
      res.status(500).json('Internal Server Error');
    }
  };






















export const AdminGetProduct=async(req,res)=>{

    try{

        const {productId}=req.params;

        const product=await Product.findById(productId);
        const modifiedProduct = product.toObject(); // Convert Mongoose document to plain JavaScript object
          modifiedProduct.id = modifiedProduct._id;
          delete modifiedProduct._id;

     console.log(modifiedProduct)
          res.status(200).json(modifiedProduct)





    }catch(error){
        console.log(error)
        res.status(500).json('Internal Server error')
    }
}




export const AdminModifyProduct=async(req,res,next)=>{

    try{

        const data=req.body;
        console.log(data)
        
        const {productId} =req.params;
        
        

        if(req.file){
          const file=req.file
        const {outputMediumFileName,outputSmallFileName}= await compressAndSaveProductImage(file.filename)
          
          data['productImage'] = {
            large: file.filename,
            medium:outputMediumFileName,
            small:outputSmallFileName
          };
         

        }
       
        if (Array.isArray(data.category) && data.category.length>0) {
        
          data['category'] = data.category.map((value) => {
            return value?.replaceAll(' ', '-');
          });
        }
        else
        {
          data['category']=[]

        }





        
        const product = await Product.findById(productId);
        
       
        delete data.id
      
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        else
    {
        // Overwrite product fields with the fields from req.body
        Object.keys(data).forEach(key => {
          product[key] = data[key];
        });
    
        // Save the updated product
        const updatedProduct = await product.save();


    
       const modifiedProduct = updatedProduct?.toObject(); // Convert Mongoose document to plain JavaScript object
          modifiedProduct.id = modifiedProduct._id;
          delete modifiedProduct._id;


          res.status(200).json(modifiedProduct)


          }



    }

    catch(error){
      next(error)
        console.log(error)
        
    }
}



export const AdminCreateProduct=async(req,res,next)=>{
    try{
      
        const data = req.body;
        
        const file=req.file
        
        
        const brand=await Brand.findOne({name:data.brand})
        
     const imagesPath={};


        if(file){
       const {outputMediumFileName,outputSmallFileName}= await compressAndSaveProductImage(file.filename)
       imagesPath['medium']=outputMediumFileName
       imagesPath['small']=outputSmallFileName
       
      }
      
        // Find the product by ID
       
      const product=new Product({
        name:data.name,
        brandId:brand?brand._id:null,
        brand:data.brand,
        details:data.details,
        category:data.category?.replaceAll(' ','-'),
        options:data.options,
       productImage:file  && {
        medium: imagesPath.medium ,
        large: file.filename,
        small: imagesPath.small 
      } 
      })

        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        const updatedProduct = await product.save();
       
    
      
       
       
       
        res.status(200).json({id:updatedProduct._id});



    }catch(error){
      console.log(error)
     
        res.status(500).json('Internal Server Error')
        next(error)
    }
}






export const AdminDeleteProduct=async(req,res)=>{
  try {


    const largeDir = path.join(__dirname, '../public/products/large');
    const mediumDir = path.join(__dirname, '../public/products/medium');
    const smallDir = path.join(__dirname, '../public/products/small');
    // Assuming req.user is populated with user data by authMiddleware
    const { productId } = req.params;
   

    // Check if the user is trying to delete their own address
    

    // Delete the address associated with the userId
    const product=await Product.findById(productId)
     
    if(typeof product.productImage === 'object'){
      
      fs.unlinkSync(path.join(largeDir,product.productImage.large))
      fs.unlinkSync(path.join(mediumDir,product.productImage.medium))
      fs.unlinkSync(path.join(smallDir,product.productImage.small))


    }
   









    const deletedProduct = await Product.findOneAndDelete({ _id: productId });
     



    if (!deletedProduct) {
      return res.status(404).json({ error: 'Address not found for deletion' });
    }

    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ error: 'Internal server error' });
  }


}

