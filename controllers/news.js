
import NewsBlog from "../models/NewsModel.js";




export const AdminCreateNews=async(req,res)=>{
    try{
       
        const data = req.body;
        
        const file=req.file
       
       
       
    
        // Find the product by ID
       
      const news=new NewsBlog({
        title:data.newsTitle,
        imageUrl:file.filename,
        topic:data.newsMainTag,
        content:data.newsContent
      })

        const updatedNews = await news.save();
    
        // Overwrite product fields with the fields from req.body
     
    
        // Save the updated product
       
       
       
        res.status(201).json(updatedNews);



    }catch(error){
      console.log(error)
        res.status(501).json('Internal Server Error')
    }
}















export const AdminGetNewsBlog=async(req,res)=>{

  try{

      const {newsId}=req.params;
      
      const news=await NewsBlog.findById(newsId);
      
      const modifiedNews = news.toObject(); // Convert Mongoose document to plain JavaScript object
        modifiedNews.id = modifiedNews._id;
        delete modifiedNews._id;


        res.status(200).json(modifiedNews)





  }catch(error){
      console.log(error)
      res.status(500).json('Internal Server error')
  }
}








export const AdminModifyNews=async(req,res)=>{

  try{

    const data=req.body;
    
     const {newsId} =req.params;
     if(req.file){
       const file=req.file
      
       data['imageUrl']=file.filename

     }

     const news=await NewsBlog.findById(newsId)

      if (!news) {
        return res.status(404).json({ error: 'News not found' });
      }
  
      // Overwrite product fields with the fields from req.body
      Object.keys(data).forEach(key => {
        news[key] = data[key];
      });
  
      // Save the updated product
      const updatedNews = await news.save();


  
     const modifiedNews = updatedNews.toObject(); // Convert Mongoose document to plain JavaScript object
        modifiedNews.id = modifiedNews._id;
        delete modifiedNews._id;


        res.status(200).json(modifiedNews)






  }

  catch(error){
      console.log(error)
      res.status(500).json('Internal Server Error')
  }
}









export const AdminGetAllNewsBlogs=async(req,res)=>{



  try{
      
      const news =await NewsBlog.find();
      
      const modifiedNews = news.map(news => {
        const newsObject = news.toObject(); // Convert Mongoose document to plain JavaScript object
        newsObject.id = newsObject._id;
        delete newsObject._id;
        return newsObject;
      });
      res.set({
        'X-Content-Header': 'application/json',
        'X-Total-Count': modifiedNews.length,
      });
    
  
      res.status(200).json(modifiedNews);
  
  
  
    }catch(error){
      console.log(error)
      res.status(500).json('Internal Server Error')
  
    }

  
}















export const AdminDeleteNews=async(req,res)=>{
  try {
    // Assuming req.user is populated with user data by authMiddleware
    const { newsId } = req.params;
   

    // Check if the user is trying to delete their own address
    

    // Delete the address associated with the userId
    const deletedNews = await NewsBlog.findOneAndDelete({ _id: newsId });

    if (!deletedNews) {
      return res.status(404).json({ error: 'News not found for deletion' });
    }

    res.status(200).json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting News:', error);
    res.status(500).json({ error: 'Internal server error' });
  }


}








export const GetNews=async(req,res)=>{


  try{
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
      const limit = 5; // Default to 10 items per page if not provided
     
      const skip = (page - 1) * limit;
  
      
      
        
      
      
   
      const products=await NewsBlog.find().skip(skip).limit(limit);
    
     
    setTimeout(()=>{
      res.status(200).json(products)
    },5000)
       
     
      
  
  
  }
  catch(error){
      console.log(error);
      res.status(501).json('Internal Server Error')
  }
  
  
  }







  export const GetNewsById=async(req,res)=>{

    try{

        const {newsId}=req.params;

        
    
        // Perform a case-insensitive search in the database
       const news=await NewsBlog.findById(newsId)
       
        console.log(news)
      


       

        res.status(200).json(news)

      



    }catch(err){
        res.status(500).json('Internal Server Error')
        console.log(err)
    }
}











