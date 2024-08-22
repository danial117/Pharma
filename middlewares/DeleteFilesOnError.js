import fs from 'fs'
import path from 'path'






export const deleteFileOnError=async(err, req, res, next)=> {

    try{

    
    console.log(err)
    if (err && req.file) {
        console.log(req.file)
        fs.unlink(req.file.path, (unlinkErr) => {
            if (unlinkErr) {
                console.error('Failed to delete uploaded file:', unlinkErr);
            }
            next(err); // Continue with error handling
        });

        if (req.file && req.file.path.includes('products')) {
            // Delete the original file
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error('Failed to delete uploaded file:', err);
                }
            });

            // Construct paths for small and medium files
            const directory = path.dirname(req.file.path);
            console.log(directory)
            const fileNameWithoutExt = path.parse(req.file.filename).name;
            console.log(fileNameWithoutExt)
            const extension = path.extname(req.file.filename);
            console.log(extension)

            const smallFilePath = path.join(directory.replace('large', 'small'), `${fileNameWithoutExt.replace('_large','_small')}${extension}`);
            console.log(smallFilePath)
            const mediumFilePath = path.join(directory.replace('large', 'medium'), `${fileNameWithoutExt.replace('_large','_medium')}${extension}`);

            // Delete the small and medium files
            fs.unlink(smallFilePath, (err) => {
                if (err) {
                    console.error('Failed to delete small file:', err);
                }else{
                    console.log('small')
                }
            });

            fs.unlink(mediumFilePath, (err) => {
                if (err) {
                    console.error('Failed to delete medium file:', err);
                }
                else{
                    console.log('medium')
                }
            });
        }

    } else {
        next(err);
    }
}
catch(err){
    console.log(err)
}
}