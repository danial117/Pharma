import mongoose from "mongoose";





const ContactSchema=mongoose.Schema({
    name:{
              type:'String',
              trim:true
    },
    email:{
        type:'String',
        trim:true
    },

    message:{
        type:'String',
        trim:true
    }
})



const ContactModel=mongoose.model('CustomerContact',ContactSchema);

export default ContactModel







