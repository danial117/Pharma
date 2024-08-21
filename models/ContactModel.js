import mongoose from "mongoose";





const ContactSchema=mongoose.Schema({
    name:{
              type:'String',
              trim:true,
              required: true
    },
    email:{
        type:'String',
        trim:true,
        required: true
    },

    message:{
        type:'String',
        trim:true,
        required: true
    }
})



const ContactModel=mongoose.model('CustomerContact',ContactSchema);

export default ContactModel







