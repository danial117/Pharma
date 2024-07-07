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
        console.log(req.body)
        const brand=new Brand({
            name:data.name,
            logoUrl:data.name
        })
        
        const brandSaved=await brand.save()

        res.status(201).json('Created')


        


    }
    catch(err){

        console.log(err)
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

        const {brandId}=req.params;
        console.log(brandId)


        const products=await Product.find({brandId:brandId})

       res.status(200).json(products)



    }catch(err){
        res.status(500).json('Internal Server Error')
        console.log(err)
    }
}



















