import Brand from "../models/BrandModel.js"
import Product from "../models/ProductModel.js";


export const GetAdminBrands=async(req,res)=>{

    try{

        const brands=await Brand.find({});

        
        const modifiedBrands = brands.map(brand => {
          const brandObject = brand.toObject(); // Convert Mongoose document to plain JavaScript object
          brandObject.id = brandObject._id;
          delete brandObject._id;
          return brandObject;
        });
        res.set({
          'X-Content-Header': 'application/json',
          'X-Total-Count': modifiedBrands.length,
        });
       
    
        res.status(200).json(modifiedBrands);




    }
    catch(err){
        console.log(err)
    }
}




export const AdminCreateBrand=async(req,res)=>{

    try{

        const data=req.body;
        const file=req.file
        const brand=new Brand({
            name:data.name,
            brandLogoPath:file.filename
        })
        
        const brandSaved=await brand.save()

        res.status(201).json('Created')


        


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

        const formattedBrandName = brandName.replace(/-/g, ' ');

        // Log the formatted brand name
        console.log(formattedBrandName);
    
        // Perform a case-insensitive search in the database
       const brand=await Brand.findOne({ 

            name: { $regex: new RegExp(`^${formattedBrandName}$`, 'i') } 

        })
       
        console.log(brand)
      


       if(brand){
        const products=await Product.find({brand:brand.name})

        res.status(200).json(products)
}else{
    res.status(404).json('Not Found')
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

        if(req.file){
          const file=req.file
         
          data['brandLogoPath']=file.filename
   
        }

        const brand = await Product.findById(brandId);

        if (!brand) {
          return res.status(404).json({ error: 'Brand not found' });
        }
    
        // Overwrite product fields with the fields from req.body
        Object.keys(data).forEach(key => {
          brand[key] = data[key];
        });
    
        // Save the updated product
        const updatedBrand = await brand.save();


    
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
  




