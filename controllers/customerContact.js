import ContactModel from "../models/ContactModel.js";
import { ThankYouMail } from "../middlewares/nodemailer.js";



export const CustomerContact=async(req,res)=>{

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
        res.status(501).json('Internal Server Error')
    }
}











export const  AdminGetUserContacts=async(req,res)=>{


    try{
  
      const contacts=await ContactModel.find();
     
      const modifiedContacts = contacts.map(contact => {
        const contactObject = contact.toObject(); // Convert Mongoose document to plain JavaScript object
        contactObject.id = contactObject._id;
        delete contactObject._id;
        return contactObject;
      });
      res.set({
        'X-Content-Header': 'application/json',
        'X-Total-Count': modifiedContacts.length,
      });
     
  
      res.status(200).json(modifiedContacts);
  
  
  
    }catch(error){
      console.log(error)
      res.status(500).json('Internal Server Error')
  
    }
  
  
  }
  






  export const AdminGetContact=async(req,res)=>{

    try{

        const {contactId}=req.params;

        const contact=await ContactModel.findById(contactId);
        const modifiedContact = contact.toObject(); // Convert Mongoose document to plain JavaScript object
          modifiedContact.id = modifiedContact._id;
          delete modifiedContact._id;


          res.status(200).json(modifiedContact)





    }catch(error){
        console.log(error)
        res.status(500).json('Internal Server error')
    }
}











export const AdminDeleteContact=async(req,res)=>{
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
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ error: 'Internal server error' });
  }


}

