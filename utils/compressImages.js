import sharp from "sharp";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

export const compressAndSaveProductImage = async (imageName) => {
    try {
      
      
      const baseDirectory = path.join(__dirname, '../public/products/large');
      const outputMediumDirectory = path.join(__dirname, '../public/products/medium');
      const outputSmallDirectory = path.join(__dirname, '../public/products/small');
      
      // Ensure the base directory exists
      if (!fs.existsSync(baseDirectory)) {
        fs.mkdirSync(baseDirectory, { recursive: true });
      }
  
      // Construct the input and output paths
      const inputPath = path.join(baseDirectory, imageName);
      const outputMediumFileName = path.basename(imageName.replace('_large',''), path.extname(imageName)) + '_medium' + path.extname(imageName);
      const outputMediumPath = path.join(outputMediumDirectory, outputMediumFileName);

      const outputSmallFileName = path.basename(imageName.replace('_large',''), path.extname(imageName)) + '_small' + path.extname(imageName);
      const outputSmallPath = path.join(outputSmallDirectory, outputSmallFileName);
  
      // Use sharp to process the image
      await sharp(inputPath)
      .resize({ width: 400 })
        .png({ quality: 50 }) // Adjust quality to 50%
        .toFile(outputMediumPath);

        await sharp(inputPath)
        .resize({ width: 200 })
        .png({ quality: 10 }) // Adjust quality to 50%
        .toFile(outputSmallPath);
  
    

      return {outputMediumFileName,outputSmallFileName}
    } catch (error) {
      console.error('Error processing image:', error);
    }
  };
  
  
 