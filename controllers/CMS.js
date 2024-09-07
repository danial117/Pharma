import CMSModel from "../models/CMSModel.js";
import {fileURLToPath} from 'url'
import path from "path";
import fs from 'fs'
import CustomError from "../utils/ErrorClass.js";
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);


export const Get_CMS_Data=async(req,res,next)=>{

    try{
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

       
       

        const CMS_Data = await CMSModel.find({});
        const totalDocuments = await CMSModel.countDocuments(query);
    
        
        const modified_CMS_Data = CMS_Data.map(data => {
          const dataObject = data.toObject(); // Convert Mongoose document to plain JavaScript object
          dataObject.id = dataObject._id;
          delete dataObject._id;
          return dataObject;
        });
    
        res.set({
          'Content-Range': `orders ${range[0]}-${range[1]}/${totalDocuments}`,
          'X-Total-Count': totalDocuments,
        });
    
        res.status(200).json(modified_CMS_Data);



    }catch(err){
      
      next(new CustomError(err.message, 500));
    }
}













export const Create_CMS_Data=async(req,res,next)=>{

    try{
      const data=req.body;
      const {id}=req.params
     const files=req.files

     const CMS_Dir=path.join(__dirname, '../public/CMS');

     

      if(files){
        files.forEach((file)=>{
          data[file.fieldname]=file.filename;
          const newPath = path.join(CMS_Dir, file.filename);

          fs.rename(file.path,newPath,(err)=>{
            if(err){
              
              fs.unlinkSync(file.path);
            }

          })
        })
        

      }


    
    const CMS_Data=await CMSModel.findById(id);
    
    if(files.length>0){
      files.forEach((file)=>{
       const prevfile= CMS_Data[file.fieldname]
      const delFile= path.join(CMS_Dir,prevfile)

       fs.unlinkSync(delFile)
        

      })

      }
    

  // Overwrite product fields with the fields from req.body
      Object.keys(data).forEach(key => {
        CMS_Data[key] = data[key];
      });
  
      // Save the updated product
      const updated_CMS = await CMS_Data.save();


  
     const modified_CMS = updated_CMS.toObject(); // Convert Mongoose document to plain JavaScript object
        modified_CMS.id = modified_CMS._id;
        delete modified_CMS._id;


        res.status(200).json(modified_CMS)
      
   



    }
    catch(err){
      next(new CustomError(err.message, 500));
      
    }
  }







export const AdminGetCMS=async(req,res,next)=>{

    try{
  
        const {id}=req.params;
        
        const CMS=await CMSModel.findById(id);
        
        const modifiedData = CMS.toObject(); // Convert Mongoose document to plain JavaScript object
          modifiedData.id = modifiedData._id;
          delete modifiedData._id;
  
  
          res.status(200).json(modifiedData)
  
  
  
  
  
    }catch(err){
      
      next(new CustomError(err.message, 500));
    }
  }
  
  



