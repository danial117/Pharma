
import Product from "../models/ProductModel.js";




const products=[
    {
        name: 'G.I. Detox™ +',
        brand: 'Biocidin Botanicals',
        price: 34.99,
        productImages:'2.png',
        details: {
            Description: 'The binding activity of G.I. Detox+™ is an essential part of any treatment strategy that includes removal. As Biocidin® works on biofilms and microbes, mobilizing LPS, metals, mycotoxins, and unwanted microbial byproducts, G.I. Detox™+ binds and clears, ensuring comfort and compliance. Microorganisms balanced. Biofilms dismantled. Detoxification done right. G.I. Detox™+ is formulated to provide broader activity than a single-ingredient product. Zeolite clay, activated charcoal, and silica, plus apple pectin, humic powder, and aloe vera. Binding and detoxification agents long used in traditional medicine and supported by modern research.',
            Warnings: ' Not recommended for use during pregnancy. Consult your physician before using any supplement, especially if you are nursing, have a medical condition, or are taking medication. Discontinue use should adverse reactions occur.',
            DietaryRestrictions: ['Gluten free','Dairy free','Soy free','Milk free','Animal product free'],
            Certifications:['Vegan','cGMP','USP'],
            More: 'Think there is no way to naturally stimulate rapid immune response? Think again! Biocidin®TS is an easy-to-use throat spray that contains our proprietary Biocidin® botanical blend. It was the subject of a human clinical trial – the gold standard in science.1 Participants (athletes tested post-workout) showed a rapid increase in immune activity within 60 minutes of use. A soothing, protective boost – so unique Biocidin Botanicals patented it.*'
        }
    }
]

export const InsertProduct=async(req,res)=>{


    const product=await Product.insertMany(products).then(()=>console.log('inserted')).catch((err)=>{console.log(err)})


}




export const GetProducts=async(req,res)=>{


try{
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    const products=await Product.find().skip(skip).limit(limit);

   
    res.status(200).json(products)


}
catch(error){
    console.log(error)
}


}



export const SearchProduct=async(req,res)=>{

    
        try {
          // Parse query parameters
          const { product, brand, page = 1, limit = 10 } = req.query;
      
          // Initialize query object
          const query = {};
      
          // Add search conditions to query object
          if (product) {
            query.name = { $regex: product, $options: 'i' }; // Case-insensitive regex search
          }
          if (brand) {
            query.brand = { $regex: brand, $options: 'i' }; // Case-insensitive regex search
          }
      
          // Calculate the number of documents to skip
          const skip = (parseInt(page) - 1) * parseInt(limit);
      
          // Retrieve products from the database with pagination and search
          const products = await Product.find(query).skip(skip).limit(parseInt(limit));
      
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
    
    const {productId}=req.params
    const product=await Product.findById(productId)
     console.log(product)

     res.status(200).json(product)
}




export const AdminGetUserProducts=async(req,res)=>{



    try{
    
        const products =await Product.find({});
        console.log(products)
        const modifiedProducts = products.map(products => {
          const productsObject = products.toObject(); // Convert Mongoose document to plain JavaScript object
          productsObject.id = productsObject._id;
          delete productsObject._id;
          return productsObject;
        });
        res.set({
          'X-Content-Header': 'application/json',
          'X-Total-Count': modifiedProducts.length,
        });
        console.log(modifiedProducts)
    
        res.status(200).json(modifiedProducts);
    
    
    
      }catch(error){
        console.log(error)
        res.status(500).json('Internal Server Error')
    
      }

    
}




export const AdminGetProduct=async(req,res)=>{

    try{

        const {productId}=req.params;

        const product=await Product.findById(productId);
        const modifiedProduct = product.toObject(); // Convert Mongoose document to plain JavaScript object
          modifiedProduct.id = modifiedProduct._id;
          delete modifiedProduct._id;


          res.status(200).json(modifiedProduct)





    }catch(error){
        console.log(error)
        res.status(500).json('Internal Server error')
    }
}




export const AdminModifyProduct=async(req,res)=>{

    try{

        const data=req.body;
        const {productId} =req.params;

        const product = await Product.findById(productId);

        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
    
        // Overwrite product fields with the fields from req.body
        Object.keys(data).forEach(key => {
          product[key] = data[key];
        });
    
        // Save the updated product
        const updatedProduct = await product.save();


    
       const modifiedProduct = updatedProduct.toObject(); // Convert Mongoose document to plain JavaScript object
          modifiedProduct.id = modifiedProduct._id;
          delete modifiedProduct._id;


          res.status(200).json(modifiedProduct)






    }

    catch(error){
        console.log(error)
        res.status(500).json('Internal Server Error')
    }
}



export const AdminCreateProduct=async(req,res)=>{
    try{
      
        const data = req.body;
        const file=req.file
       
    
        // Find the product by ID
       
      const product=new Product({
        name:data.name,
        brand:data.brand,
        price:data.price,
        details:data.details,
        productImage:file.filename
      })

        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        const updatedProduct = await product.save();
    
        // Overwrite product fields with the fields from req.body
     
    
        // Save the updated product
       
        console.log(updatedProduct)
        res.status(200).json(updatedProduct);


    }catch(error){
        res.status(500).json('Internal Server Error')
    }
}










