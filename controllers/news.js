
import NewsBlog from "../models/NewsModel.js";




export const AdminCreateNews=async(req,res,next)=>{
    try{
       
        const data = req.body;
        
        const file=req.file
        console.log(file)
       
       
    
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
       
       
       
        res.status(201).json({id:updatedNews._id});



    }catch(error){
      console.log(error)
      next(error)
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








export const AdminModifyNews=async(req,res,next)=>{

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
      next(error)
      res.status(500).json('Internal Server Error')
  }
}















export const AdminGetAllNewsBlogs = async (req, res) => {
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
    const newsBlogs = await NewsBlog.find(query).sort(sortObject).skip(skip).limit(limit);
    const totalNews = await NewsBlog.countDocuments(query);

    
    const modifiedNews = newsBlogs.map(news => {
      const newsObject = news.toObject(); // Convert Mongoose document to plain JavaScript object
      newsObject.id = newsObject._id;
      delete newsObject._id;
      return newsObject;
    });

    res.set({
      'Content-Range': `news ${range[0]}-${range[1]}/${totalNews}`,
      'X-Total-Count': totalNews,
    });

    res.status(200).json(modifiedNews);
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
};























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











