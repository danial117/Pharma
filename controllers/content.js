import DomModel from "../models/DomModel.js";






export const GetContent=async(req,res)=>{

    try{

        const content=await DomModel.findOne({});
        

        res.status(200).json(content)




    }catch(err){
        console.log(err)
    }
}


export const AdminGetContent=async(req,res)=>{

    try{

        const contents =await DomModel.find({});
        console.log(contents)
        const modifiedContents = contents.map(content => {
          const contentObject = content.toObject(); // Convert Mongoose document to plain JavaScript object
          contentObject.id = contentObject._id;
          delete contentObject._id;
          return contentObject;
        });
        res.set({
          'X-Content-Header': 'application/json',
          'X-Total-Count': modifiedContents.length,
        });
        console.log(modifiedContents)
    
        res.status(200).json(modifiedContents);


    }catch(err){
        console.log(err)
    }
}



export const AdminShowContent=async(req,res)=>{

    try{

        const {id}=req.params;

        const content=await Product.findById(id);
        const modifiedContent = content.toObject(); // Convert Mongoose document to plain JavaScript object
          modifiedContent.id = modifiedContent._id;
          delete modifiedContent._id;


          res.status(200).json(modifiedContent)



    }
    catch(err){

        console.log(err)
    }
}



export const AdminModifyContent=async(req,res)=>{

    try{
       const data=req.body
        const updatedDocument = await DomModel.findOneAndUpdate({},data , { new: true, upsert: true });
        console.log('Document updated successfully:', updatedDocument);
      
        const modifiedContent = updatedDocument.toObject(); // Convert Mongoose document to plain JavaScript object
          modifiedContent.id = modifiedContent._id;
          delete modifiedContent._id;


          res.status(200).json(modifiedContent)
        
        res.status(200).json('updated')

    }
    catch(err){
        console.log(err)
    }
}

