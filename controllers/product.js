
import Brand from "../models/BrandModel.js";
import Product from "../models/ProductModel.js";
import { compressAndSaveProductImage } from "../utils/compressImages.js";
import path from 'path'
import { fileURLToPath } from 'url';
import fs from 'fs'
import CustomError from '../utils/ErrorClass.js';

// Get current file directory
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);








export const GetProducts=async(req,res,next)=>{


try{
    const page = parseInt(req.query?.page) || 1; // Default to page 1 if not provided
    let limit = parseInt(req.query?.limit)<40?parseInt(req.query.limit) : 40; // Default to 10 items per page if not provided
    const type = req.query?.type;
    const name =req.query?.name
    const brand =req.query?.brand
    const productName =req.query?.productName
    const category =req.query?.category
    
    const skip = (page - 1) * limit;
    
    if (type) {
      let query = {};
      // If type parameter is provided, use regex to match products containing the type in their name
      query = { name: { $regex: type, $options: 'i' },$nor: [
        { productImage: { $type: "string" } },
        { productImage: "" }
      ]}; // 'i' option for case-insensitive search
      const count = await Product.countDocuments(query);  // Get total count of matching documents
      const randomSkip = Math.floor(Math.random() * count);  // Generate a random skip value
      
      const products = await Product.find(query)
        .select('productImage name brand options')
        .skip(randomSkip)   // Skip a random number of documents
        .limit(limit);      // Limit the number of returned documents
    
     
      res.status(200).json(products);
     
  
}

else if(name){

 function breakString(productName) {
  // Split on capital letters, spaces, and hyphens
  const substrings = productName.split(/(?=[A-Z])|\s+|-+/);
  return substrings;
}

  async function findSimilarProducts(productName) {
    let data=[]
    // Break the product name into substrings
    const substrings = breakString(productName);
   
    // Create the regex query using the substrings
    const regexQueries = substrings.map(substring => ({
      name: { $regex: substring, $options: 'i',$ne:productName }
    }));
   
    // Combine the regex queries with an $or operator
    const query = {
      $or: regexQueries,
      $nor: [
        { productImage: { $type: "string" } },
        { productImage: "" }
      ]
    };
  
    // Fetch the similar products from the database, limiting the result to 6 products
    const products = await Product.find(query)
      .select('productImage name brand options') // Select specific fields
      .limit(limit); // Limit to 6 products

      data.push(...products)

     if(data.length !==6){
      limit =data.length -6;
      const categoryProducts = await Product.find({category:category,
        name: { $ne: productName },
        $nor: [
        { productImage: { $type: "string" } },
        { productImage: "" }
      ]})
      .select('productImage name brand options') // Select specific fields
      .limit(limit);

      data.push (...categoryProducts)


     }

     if(data.length !==6){
      limit =data.length-6;
      const brandProducts = await Product.find({brand:brand,
        name: { $ne: productName },
        $nor: [
        { productImage: { $type: "string" } },
        { productImage: "" }
      ]})
      .select('productImage name brand options') // Select specific fields
      .limit(limit);

      data.push (...brandProducts)


     }
  



    return data;
  }

  const similarProducts=await findSimilarProducts(name)
  

  
    res.status(200).json(similarProducts)
  
  
  
  
}
else if(productName && brand){
  const productsByBrand=await Product.find({name:new RegExp(productName, 'i'),brand:brand})
  .select('productImage name brand options') 
  .limit(limit);

  setTimeout(()=>
    {
      res.status(200).json(productsByBrand)
    
    },1000
  )
 

}
    
    else
{
    // Calculate the number of documents to skip
    

    const count = await Product.countDocuments({
      $nor: [
        { productImage: { $type: "string" } },  // Exclude documents with productImage as a string
        { productImage: "" }                    // Exclude documents with an empty productImage
      ]
    });
    
    const randomSkip = Math.floor(Math.random() * count);  // Generate a random skip value
    
    const products = await Product.find({
      $nor: [
        { productImage: { $type: "string" } },
        { productImage: "" }
      ]
    })
      .select('productImage name brand options')
      .skip(randomSkip)   // Skip a random number of documents
      .limit(limit); 
  
   
  
      res.status(200).json(products)
      
    
}


}
catch(err){
  

    next(new CustomError(err.message, 500));
  


}


}






export const SearchProductCategory = async (req, res,next) => {
  try {
    // Parse query parameters
    const { product } = req.query;
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = Math.min(parseInt(req.query.limit) || 10, 20); // Limit to 20 items per page

    // Initialize query object
    const query = {};

    if (product) {
        const parts = product.split(' ');
        let brand = '';
        let productName = '';

        // Determine brand and product name based on position
        if (parts.length > 1) {
            brand = parts.pop(); // Last part as brand
            productName = parts.join(' '); // Remaining parts as product name
        } else {
            productName = parts[0]; // If only one part, treat as product name
        }

        const brandRegex = new RegExp(brand, 'i'); // Regex for brand
        const productRegex = new RegExp(productName, 'i'); // Regex for product name

        // Build the query
        query.$or = [
            { name: productRegex }, // Search for products matching the product name
            { brand: brandRegex }    // Search for all products of the brand
        ];
    }

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Retrieve products from the database with pagination and search
    const products = await Product.find({
        ...query,
        $nor: [
            { productImage: { $type: "string" } },
            { productImage: "" }
        ]
    })
    .select('productImage name brand options')
    .sort({
        // Sort to prioritize products by name matches first
        name: { $regex: product ? productRegex : '', $options: 'i' },
        brand: 1 // Sort by brand name as secondary
    })
    .skip(skip)
    .limit(limit);

    // Get the total number of matching products to calculate total pages
    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    // Send the paginated results along with additional information
    res.status(200).json({ products, totalPages, currentPage: page });

} catch (err) {
    next(new CustomError(err.message, 500));
}
};











export const SearchProduct=async(req,res,next)=>{
  try {
    // Parse query parameters
    const { product } = req.query;
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = Math.min(parseInt(req.query.limit) || 10, 20); // Limit to 20 items per page

    // Initialize query object
    const query = {};

    // Add search conditions to query object
    if (product) {
        // Split the input into parts for separate search
        const searchParts = product.split(' ');
        const regex = new RegExp(searchParts.join('|'), 'i'); // Create a case-insensitive regex
        
        // Use $or to search in both fields
        query.$or = [
            { name: regex },    // Search by product name
            { brand: regex }    // Search by brand name
        ];
    }

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Retrieve products from the database with pagination and search
    const products = await Product.find({
        ...query,
        $nor: [
            { productImage: { $type: "string" } },
            { productImage: "" }
        ]
    })
    .select('productImage name brand options')
    .skip(skip)
    .limit(limit);

    // Get the total number of matching products to calculate total pages
    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    // Send the paginated results along with additional information
    res.status(200).json({ products, totalPages, currentPage: page });

} catch (err) {
    next(new CustomError(err.message, 500));
}
      };





      




export const GetProduct=async(req,res)=>{
    
  try{
    const {productId}=req.params
    const product=await Product.findById(productId).select('productImage category details name brand options ')
    
  
    if(product && typeof product.productImage !=='string')
    {
       res.status(200).json(product)
      }
      else{
        res.status(404).json('Not Found')
      }
  }
  catch(err){
    
  
      next(new CustomError(err.message, 500));
    
  }
}













  export const AdminGetUserProducts = async (req, res,next) => {
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
    } catch (err) {
     
     
        next(new CustomError(err.message, 500));
      
    }
  };






















export const AdminGetProduct=async(req,res,next)=>{

    try{

        const {productId}=req.params;

        const product=await Product.findById(productId);
        const modifiedProduct = product.toObject(); // Convert Mongoose document to plain JavaScript object
          modifiedProduct.id = modifiedProduct._id;
          delete modifiedProduct._id;

     console.log(modifiedProduct)
          res.status(200).json(modifiedProduct)





    }catch(error){
       
    
        next(new CustomError(err.message, 500));
      
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

    catch(err){
    
        next(new CustomError(err.message, 500));
      
        
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
     
     
    
        next(new CustomError(err.message, 500));
      
    }
}






export const AdminDeleteProduct=async(req,res,next)=>{
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
   
   
      next(new CustomError(err.message, 500));
    
  }


}

