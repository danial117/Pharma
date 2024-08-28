import Product from "../models/ProductModel.js";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from "url";
import NewsBlog from "../models/NewsModel.js";
import Brand from "../models/BrandModel.js";



const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);



export const modifiedProductFile = async (req, res,next) => {
    try {
       
       
        const { productId } = req.params; // Assuming id is passed in the URL params

        // Find the product by _id
        if(req.file){
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json('Product not found');
        }

        // Extract productImage file name and construct the file path
        const productImageFileName = product.productImage.large.replace('_large','') // Adjust according to your schema
        if (productImageFileName) {
            const imageSizes = ['large', 'medium', 'small']; // Array of directory names corresponding to image sizes
            const imageBaseName = productImageFileName.replace(/(_large|_medium|_small)/, '').replace('.png',''); // Remove size suffix
            console.log(imageBaseName)
            imageSizes.forEach((size) => {
                const imagePath = path.join(__dirname, `../public/products/${size}`, `${imageBaseName}_${size}.png`);
                
                // Remove the image file if it exists
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                    console.log('Deleted:', imagePath);
                } else {
                    console.log('File not found:', imagePath);
                }
            }
            )
        }

        if (productImageFileName) {
            const imagePath = path.join(__dirname, '../public/products/lg', productImageFileName);

            // Remove the image file if it exists
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            } else {
                console.log('File not found:', imagePath);
            }
        }
}
        next()

        

       
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
};




export const modifiedNewsFile = async (req, res,next) => {
    try {
       
       
        const { newsId } = req.params; // Assuming id is passed in the URL params

        // Find the product by _id
        if(req.file){
        const news = await NewsBlog.findById(newsId);

        if (!news) {
            return res.status(404).json('News not found');
        }
        console.log(req.file)
        // Extract productImage file name and construct the file path
        const newsImageFileName = news.imageUrl // Adjust according to your schema
        if (newsImageFileName) {
            const imagePath = path.join(__dirname, '../public/news', newsImageFileName);

            // Remove the image file if it exists
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            } else {
                console.log('File not found:', imagePath);
            }
        }
}
        next()

        

       
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
};




export const modifiedBrandFile = async (req, res,next) => {
    try {
       
       
        const { brandId } = req.params; // Assuming id is passed in the URL params

        // Find the product by _id
        if(req.file){
        const brand = await Brand.findById(brandId);

        if (!brand) {
            return res.status(404).json('Brand not found');
        }
        console.log(req.file)
        // Extract productImage file name and construct the file path
        const brandImageFileName = brand.brandLogoPath
        // Adjust according to your schema
        if (brandImageFileName) {
            const imagePath = path.join(__dirname, '../public/brands', brandImageFileName);

            // Remove the image file if it exists
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            } else {
                console.log('File not found:', imagePath);
            }
        }
}
        next()

        

       
    } catch (error) {
        console.error(error);
        res.status(500).json('Internal Server Error');
    }
};















