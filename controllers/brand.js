import Brand from "../models/BrandModel.js"
import Product from "../models/ProductModel.js";








export const GetAdminBrands = async (req, res) => {
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
    const brands = await Brand.find(query).sort(sortObject).skip(skip).limit(limit);
    const totalBrands = await Brand.countDocuments(query);

    
    const modifiedBrands = brands.map(brand => {
      const brandObject = brand.toObject(); // Convert Mongoose document to plain JavaScript object
      brandObject.id = brandObject._id;
      delete brandObject._id;
      return brandObject;
    });

    res.set({
      'Content-Range': `brands ${range[0]}-${range[1]}/${totalBrands}`,
      'X-Total-Count': totalBrands,
    });

    res.status(200).json(modifiedBrands);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
};







export const AdminCreateBrand=async(req,res)=>{

    try{

        const data=req.body;
        const file=req.file
        const brand=new Brand({
            name:data.name,
            brandLogoPath:file.filename
        })
        
        const brandSaved=await brand.save()

        if(brandSaved){

        const updateProducts=await Product.updateMany({
          $or: [
            { brand: brandSaved.name },          // Condition 1: Check for brand name
            { brandId: brandSaved._id }          // Condition 2: Check for brand ID
          ]
        },{$set:{brandId:brandSaved._id,brand:brandSaved.name}})
}
        res.status(201).json({id:brandSaved._id})


        


    }
    catch(err){

        console.log(err)
        res.status(501).json('Internal Server Error')
    }
}



export const GetBrands=async(req,res)=>{


    try{

        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
        const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided
    
        // Calculate the number of documents to skip
        const skip = (page - 1) * limit;
    
        const brands=await Brand.find().skip(skip).limit(limit);
        res.status(200).json(brands)


    }
    catch(err){
        console.log(err)
    }
}














export const GetBrandProducts=async(req,res)=>{

    try{

        const {brandName}=req.params;
        console.log(brandName)
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
          const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided
          const formattedBrandName = brandName.replace(/-/g, ' ');
          const skip = (page - 1) * limit;

        // Log the formatted brand name
        
    
        // Perform a case-insensitive search in the database
       const brand=await Brand.findOne({ 

            name: { $regex: new RegExp(`^${formattedBrandName}$`, 'i') } 

        })
       
      


       if(brand){
        const products=await Product.find({brand:brand.name}).skip(skip).limit(limit);
       
        res.status(200).json(products)
}

else{
    res.status(404).json([])
}
      



    }catch(err){
        res.status(500).json('Internal Server Error')
        console.log(err)
    }
}







export const AdminModifyBrand=async(req,res)=>{

    try{

        const data=req.body;
        const {brandId} =req.params;
        console.log(data)
        if(req.file){
          const file=req.file
         
          data['brandLogoPath']=file.filename
   
        }

        const brand = await Brand.findById(brandId);

        if (!brand) {
          return res.status(404).json({ error: 'Brand not found' });
        }
    
        // Overwrite product fields with the fields from req.body
        Object.keys(data).forEach(key => {
          brand[key] = data[key];
        });
    
        // Save the updated product
        const updatedBrand = await brand.save();
 console.log(updatedBrand)
        if(updatedBrand){
          const updateProducts=await Product.updateMany({
            $or: [
              { brand: brand.name },          // Condition 1: Check for brand name
              { brandId: brand._id }          // Condition 2: Check for brand ID
            ]
          },{$set:{brandId:updatedBrand._id,brand:updatedBrand.name}})
        }


    
       const modifiedBrand = updatedBrand.toObject(); // Convert Mongoose document to plain JavaScript object
          modifiedBrand.id = modifiedBrand._id;
          delete modifiedBrand._id;


          res.status(200).json(modifiedBrand)






    }

    catch(error){
        console.log(error)
        res.status(500).json('Internal Server Error')
    }
}









export const AdminGetBrand=async(req,res)=>{

    try{
  
        const {brandId}=req.params;
  
        const brand=await Brand.findById(brandId);
        const modifiedBrand = brand.toObject(); // Convert Mongoose document to plain JavaScript object
          modifiedBrand.id = modifiedBrand._id;
          delete modifiedBrand._id;
  
            console.log(modifiedBrand)
          res.status(200).json(modifiedBrand)
  
  
  
  
  
    }catch(error){
        console.log(error)
        res.status(500).json('Internal Server error')
    }
  }
  
  
  
  
  
export const AdminDeleteBrand=async(req,res)=>{
    try {
      // Assuming req.user is populated with user data by authMiddleware
      const { brandId } = req.params;
     
  
      // Check if the user is trying to delete their own address
      
  
      // Delete the address associated with the userId
      const deletedBrand = await Brand.findOneAndDelete({ _id: brandId });
  
      if (!deletedBrand) {
        return res.status(404).json({ error: 'Brand not found for deletion' });
      }
  
      res.status(200).json({ message: 'Brand deleted successfully' });
    } catch (error) {
      console.error('Error deleting News:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  
  
  }
  




