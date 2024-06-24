import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Define the schema for the page content
const DomModelScehma = new Schema({
    HomePageMainBanner: {type:String},
    HomePageMainBannerText:{type:Object},
    AboutPageImage1:{type:String},
    AboutPageImage2:{type:String},
    AboutPageImage3:{type:String},
    AboutPageImageText1:{type:Object},
    AboutPageImageText2:{type:Object},
    AboutPageImageText3:{type:Object},
    SignUpPageText:{type:Object},
    SignUpPageImage:{type:String}

});

// Create the model from the schema
const DomModel = mongoose.model('DOM', DomModelScehma);

export default DomModel;












