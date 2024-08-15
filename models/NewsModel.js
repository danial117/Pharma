import mongoose from "mongoose";

// Define the schema for a news blog post
const newsBlogSchema = new mongoose.Schema({
    // The title of the news blog post
    title: {
        type: String,
        required: true,
        trim: true
    },
    // The main content of the news blog post
    content: {
        type: String,
        required: true
    },
    // The time when the post was created or published
    timestamp: {
        type: Date,
        default: Date.now
    },
    topic:{
        type: String,
        required: true
    },
    // Optional: Tags or categories for the post
    tags: {
        type: [String],
        default: []
    },
    // Optional: A URL or path to an image associated with the post
    imageUrl: {
        type: String,
        trim: true
    }
});

// Create a model based on the schema
const NewsBlog = mongoose.model('NewsBlog', newsBlogSchema);

export default NewsBlog;
