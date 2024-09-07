import ContactModel from "../models/ContactModel.js";
import { ThankYouMail } from "../middlewares/nodemailer.js";
import CustomError from "../utils/ErrorClass.js";


export const CustomerContact=async(req,res,next)=>{

    try{

        const data=req.body


        const contact=new ContactModel({
            name:data.name,
            email:data.email,
            message:data.message
        })


        const contactSaved=await contact.save();
       await ThankYouMail(contactSaved.name,contactSaved.email)
        
        res.status(201).json('Ok')








     }
    catch(err){
      next(new CustomError(err.message, 500));
    }
}











export const  AdminGetUserContacts=async(req,res,next)=>{


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
  
      
      // Find orders based on the filter, sort, skip, and limit
      const customerContacts = await ContactModel.find(query).sort(sortObject).skip(skip).limit(limit);
      const totalContacts = await ContactModel.countDocuments(query);
  
      
      const modifiedCustomerContacts = customerContacts.map(customerContact => {
        const customerContactObject = customerContact.toObject(); // Convert Mongoose document to plain JavaScript object
        customerContactObject.id = customerContactObject._id;
        delete customerContactObject._id;
        return customerContactObject;
      });
  
      res.set({
        'Content-Range': `news ${range[0]}-${range[1]}/${totalContacts}`,
        'X-Total-Count': totalContacts,
      });
  
      res.status(200).json(modifiedCustomerContacts);
  
  
  
    }catch(err){
      next(new CustomError(err.message, 500));
    }
  
  
  }
  






  export const AdminGetContact=async(req,res,next)=>{

    try{

        const {contactId}=req.params;

        const contact=await ContactModel.findById(contactId);
        const modifiedContact = contact.toObject(); // Convert Mongoose document to plain JavaScript object
          modifiedContact.id = modifiedContact._id;
          delete modifiedContact._id;


          res.status(200).json(modifiedContact)





    }catch(err){
      next(new CustomError(err.message, 500));
    }
}











export const AdminDeleteContact=async(req,res,next)=>{
  try {
    // Assuming req.user is populated with user data by authMiddleware
    const {contactId } = req.params;
   

    // Check if the user is trying to delete their own address
    

    // Delete the address associated with the userId
    const deletedContact = await ContactModel.findOneAndDelete({ _id: contactId });

    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found for deletion' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
  
    next(new CustomError(err.message, 500));
  }


}

