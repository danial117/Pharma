import mongoose from 'mongoose';


const Schema = mongoose.Schema;

// Define the schema for the page content
const CMSModelScehma = new Schema({
    HomePageMainBanner: {type:String},
    HomePageMainBannerText:{
        text1:{type:String,trim:true},
        text2:{type:String,trim:true}
    },
    AboutPageImage1:{type:String},
    AboutPageImage2:{type:String},
    AboutPageImage3:{type:String},
    AboutPageImageText1:{
        text1:{type:String,trim:true},
        text2:{type:String,trim:true}
    },
    AboutPageImageText2:{
        text1:{type:String,trim:true},
        text2:{type:String,trim:true}
    },
    AboutPageImageText3:{
        text1:{type:String,trim:true},
        text2:{type:String,trim:true}
    },
    SignUpPageText:{
        text1:{type:String,trim:true},
        text2:{type:String,trim:true}
    },
    SignUpPageImage:{type:String},
    HomePageAdBanner:{type:String},
    HomePageAdBannerText:{
        text1:{type:String,trim:true},
        text2:{type:String,trim:true}
    },
    HomePageAdBannerTextSetting:{type:Object},
    FooterContent:{
        email:{type:String,trim:true},
        facebookLink:{type:String,trim:true},
        instagramLink:{type:String,trim:true},
        youtubeLink:{type:String,trim:true},
        twitterLink:{type:String,trim:true}


    },

});

// Create the model from the schema
const CMSModel = mongoose.model('DOM', CMSModelScehma);

export default CMSModel;












