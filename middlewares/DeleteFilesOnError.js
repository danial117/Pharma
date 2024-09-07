import fs from 'fs'
import path from 'path'
import CustomError from '../utils/ErrorClass.js';





export const deleteFileOnError=async(err, req, res, next)=> {

    try{

    
   
    if (err && req.file) {
      
        fs.unlink(req.file.path, (unlinkErr) => {
            if (unlinkErr) {
               throw new Error('An error occurred while unlinking the file.')
            }
            next(new CustomError(err.message, 500)); // Continue with error handling
        });

        if (req.file && req.file.path.includes('products')) {
            // Delete the original file
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    (new CustomError(err.message, 500));
                }
            });

            // Construct paths for small and medium files
            const directory = path.dirname(req.file.path);
          
            const fileNameWithoutExt = path.parse(req.file.filename).name;
            
            const extension = path.extname(req.file.filename);
           

            const smallFilePath = path.join(directory.replace('large', 'small'), `${fileNameWithoutExt.replace('_large','_small')}${extension}`);
          
            const mediumFilePath = path.join(directory.replace('large', 'medium'), `${fileNameWithoutExt.replace('_large','_medium')}${extension}`);

            // Delete the small and medium files
            fs.unlink(smallFilePath, (err) => {
                if (err) {
                    (new CustomError(err.message, 500));
                    
                }else{
                    console.log('small')
                }
            });

            fs.unlink(mediumFilePath, (err) => {
                if (err) {
                    next(new CustomError(err.message, 500));
                }
                else{
                    
                }
            });
        }

    } else {
        next(new CustomError(err.message, 500));
    }
}
catch(err){
    next(new CustomError(err.message, 500));
    
}
}