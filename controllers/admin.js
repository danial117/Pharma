
import User from "../models/UserModel.js";
import Address from "../models/AddressModel.js";
import Cart from "../models/CartModel.js";
import Order from "../models/OrderModel.js";
import Product from "../models/ProductModel.js";
import mongoose from "mongoose";
import { generateAccessToken,generateAdminRefreshToken } from "../middlewares/auth.js";
import { generateOtp,isOtpValid } from "../utils/otp.js";
import { sendAdminOTPMail } from "../middlewares/nodemailer.js";
import Brand from "../models/BrandModel.js";
import csvParser from 'csv-parser';
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { compressAndSaveProductImage } from "../utils/compressImages.js";
import NewsBlog from "../models/NewsModel.js";
import CustomError from "../utils/ErrorClass.js";
// Get current file directory
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);



export const AdminSearchQuery=async(req,res,next)=>{

    try{

        const {query,model}=req.params;
        const isObjectId = mongoose.Types.ObjectId.isValid(query);

        if(model === 'User'){
            const user=await User.findOne({
                $or: [
                  
                  { name: query },
                  { email: query },
                  {authenticationMethod:query},
                  {googleId:query},
                  {password:query}
                  // isObjectId ? { _id: new mongoose.Types.ObjectId(query) } : null,
                  

                  
                ]
              });

             const order=await Order.findOne({user:user._id})
             const cart=await Cart.findOne({user:user._id})
             const address=await Address.findOne({user:user._id})

              res.status(200).json({user,order,cart,address})
        }

        if(model === 'Order'){

            const order=await Order.findOne({
                $or: [ 
                  {user:query},
                  {orderNumber: query },
                  {paymentMethod:query},
                  {paymentStatus:query},
                  {orderStatus:query}
                 
                  

                  
                ]
              });

              const user=await User.findOne({_id:order.user})
              const cart=await Cart.findOne({user:order.user}).populate('items.product')
             const address=await Address.findOne({user:order.user})


              res.status(200).json({user,order,cart,address})

        }

        if(model === 'Address'){
            const address=await Order.findOne({
                $or: [ 
                  {user:query},
                  {email: query },
                  {firstName:query},
                  {lastName:query},
                  {state:query},
                  {city:query},
                  {stateCode:query},
                  {zip:query}
                 
                  

                  
                ]
              });

              const user=await User.findOne({_id:address.user})
              const order=await User.findOne({_id:address.user})
              const cart=await Cart.findOne({user:address.user}).populate('items.product')
             


              res.status(200).json({user,order,cart,address})

        }

        if(model === 'Product'){
          const product=await Product.findOne({
              $or: [ 
                {name:query},

              ]
            });

          const brand=await Brand.findById(product.brandId)

            res.status(200).json({product,brand})

      }

       
        

       

    }catch(err){
       
    
        next(new CustomError(err.message, 500));
      



    }
}









export const AdminLogin=async(req,res,next)=>{
  try{
    const {email,password} =req.body;

  
  const user=await User.findOne({email:email});

  if(user){
      if(user.password === password && user.isAdmin )
      {
    
       


      
    
            const otp = generateOtp();
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
     
    const emailLists=[user.email,'danigondal122@gmail.com','danigondal114@gmail.com']
    await user.save();
    await sendAdminOTPMail(emailLists, otp,user.name);

    res.status(200).json({ message: 'OTP sent to email' });
         
       
         
      }else{
        return res.status(403).json({ message: 'Access denied' });

      }


  }else{
      res.status(401).json('Unauthorized')
  }
  }catch(error){
    
      next(new CustomError(err.message, 500));
    
  }
}
 





export const VerifyOTP=async(req,res,next)=>{
  const {  otp } = req.body;

  try {
    const user = await User.findOne({otp:otp,isAdmin:true});

    if (!user || !isOtpValid(otp, user.otp, user.otpExpires)) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }
    
    else

    {
    // OTP is valid
    await User.updateOne(
      { email:user.email },
      { $unset: { otp: "", otpExpires: "" } } // Use $unset to remove fields
    );

       const accessToken = generateAccessToken(user._id);
          const refreshToken = generateAdminRefreshToken(user._id);
       
          res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/', // Adjust the path as needed
            maxAge: 1* 24 * 60 * 60 * 1000, // Example: 7 days expiry
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            sameSite: '', // Adjust as per your CORS settings
          });

    res.status(200).json({ accessToken:accessToken,permission:user.isAdmin });
  }
  } catch (err) {
   
    
      next(new CustomError(err.message, 500));
    
  }
}







export const AdminProductsCsvFileHandling = (req, res,next) => {
  const results = [];

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Read and parse the uploaded CSV file
  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on('data', (row) => {
      // Preprocess the row to remove quotes and trim whitespace
      const cleanedRow = {};
      for (let key in row) {
        // Remove any leading/trailing whitespace and extraneous quotes
        cleanedRow[key.trim()] = row[key].trim().replace(/^"|"$/g, '');
      }
      // Push the cleaned row into the results array
      results.push(cleanedRow);
    })
    .on('end', async () => {
      try {
        for (const data of results) {
            try {
             
              const options = data.option.split(',').reduce((acc, opt, index) => {
                const price = data.price.split(',')[index];
                if (price) {
                  acc.push({
                    option: opt.trim(),
                    price: price.trim(),
                  });
                }
                return acc;
              }, []);
                // Create a new product based on the CSV data
                const product = new Product({
                    name: data.name,
                    brand: data.brand,
                    brandId: data.brandId, // Adjust based on CSV structure
                    productImage: data.productImage,
                    category: data.category ? data.category.split(',') : [],
                    options: options,
                    details: {
                        Description: data.Description,
                        Warnings: data.Warnings,
                        More: data.More,
                        DietaryRestrictions: data.DietaryRestrictions ? data.DietaryRestrictions.split(',') : [],
                        Certifications: data.Certifications ? data.Certifications.split(',') : [],
                    },
                });

                // Save the product to the database
                await product.save();
               
            } catch (err) {
             
               
              
              
            }
        }


        res.status(200).send('CSV file processed and data saved successfully.');
      } catch (err) {
        
          next(new CustomError(err.message, 500));
        
      } finally {
       
        fs.unlinkSync(req.file.path);
      }
    });
};

























export const AdminBrandsCsvFileHandling = (req, res,next) => {
  const results = [];

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Read and parse the uploaded CSV file
  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on('data', (row) => {
      // Preprocess the row to remove quotes and trim whitespace
      const cleanedRow = {};
      for (let key in row) {
        
        // Remove any leading/trailing whitespace and extraneous quotes
        cleanedRow[key.trim()] = row[key].trim().replace(/^"|"$/g, '');
      }
      // Push the cleaned row into the results array
      results.push(cleanedRow);
    })
    .on('end', async () => {
      try {
        for (const data of results) {
            try {
             
            console.log(data)
                // Create a new product based on the CSV data
                const brand = new Brand({
                    name: data.name,
                    brandLogoPath:data.brandImage
                });

                // Save the product to the database
              const brandSaved=  await brand.save();
              if(brandSaved){

                const updateProducts=await Product.updateMany({
                  $or: [
                    { brand: brandSaved.name },          // Condition 1: Check for brand name
                    { brandId: brandSaved._id }          // Condition 2: Check for brand ID
                  ]
                },{$set:{brandId:brandSaved._id,brand:brandSaved.name}})
              }
              
               
            } catch (err) { 
             
             console.log(err)
               
            }
        }


        res.status(200).send('CSV file processed and data saved successfully.');
      } catch (err) {
       
        next(new CustomError(err.message, 500));
      } finally {
       
        fs.unlinkSync(req.file.path);
      }
    });
};







export const AdminUploadProductImagesFolder=async (req,res,next)=>{

  try {
    const files = req.files;
    
    const matchedFiles = [];
    const productsDir = path.join(__dirname, '../public/products/large');
 
    // Iterate over the uploaded files
    for (let file of files) {
       
        const product = await Product.findOne({ productImage: file.originalname });
        // console.log(product)
        
        if (product) {
          const newFilename = `${Date.now()}-${file.originalname.replace(/ /g, '_').replace('.png', '_large.png')}`;

                const newPath = path.join(productsDir, newFilename);
                 
                if (!fs.existsSync(productsDir)) {
                  fs.mkdirSync(productsDir, { recursive: true });
              }
              


                // Move the file to the new location with the new name
                try {
                  // Synchronously rename (move) the file
                  fs.renameSync(file.path, newPath);
                  
                  
              
                  // Call the async function to compress and save the product image
                  const { outputMediumFileName, outputSmallFileName } = await compressAndSaveProductImage(newFilename);
              
                  // Update the product object with the new image paths
                  product.productImage = {
                      large: newFilename,
                      medium: outputMediumFileName,
                      small: outputSmallFileName
                  };
                  
                  // Save the product document
                  await product.save();
              
                 
              
              } catch (err) {
                 
              }

              
                matchedFiles.push({ ...file, newFilename });
            
        } else {
           console.log('delete')
            // If no match, delete the file
            fs.unlinkSync(file.path);
        }
    }

    // If no files matched, send a response indicating no files were saved
    if (matchedFiles.length === 0) {
         res.status(200).json({ message: 'Product does not exist.' });
    }else{
      for (let file of matchedFiles){
          // console.log(matchedFiles)
        fs.unlinkSync(file.path);
         res.status(200).json({ message: 'Product does not exist.' });
      }
       
    }

    // Pass the matched files to the next middleware/controller
    

} catch (err) {
 
  next(new CustomError(err.message, 200));
}
}



























export const AdminUploadBrandImagesFolder=async (req,res)=>{

  try {
    const files = req.files;
    const matchedFiles = [];
    const brandsDir = path.join(__dirname, '../public/brands');
 
    // Iterate over the uploaded files
    for (let file of files) {
       console.log(file)
        const brand = await Brand.findOne({ brandLogoPath: file.originalname });

        if (brand) {
          const newFilename = `${Date.now()}-${file.originalname.replace(/ /g, '_')}`;

                const newPath = path.join(brandsDir, newFilename);
                  


                // Move the file to the new location with the new name
                fs.rename(file.path, newPath, async(err) => {
                  if (err) {
                    console.error(`Failed to rename and move file: ${err.message}`);
                } else {
                    
                 brand.brandLogoPath=newFilename;
                 brand.imageAvailable=true
                  
                 await brand.save()
                   





                }
                });


                matchedFiles.push({ ...file, newFilename });
            
        } else {
            // If no match, delete the file
            fs.unlinkSync(file.path);
        }
    }

    // If no files matched, send a response indicating no files were saved
    if (matchedFiles.length === 0) {
        return res.status(200).json({ message: 'No files matched with any product images.' });
    }else{
      for (let file of matchedFiles){
       
        fs.unlinkSync(file.path);
      }
       
    }

    // Pass the matched files to the next middleware/controller
    

} catch (err) {
  next(new CustomError(err.message, 500));
}
}















export const AdminNewsCsvFileHandling = (req, res) => {
  const results = [];

  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Read and parse the uploaded CSV file
  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on('data', (row) => {
      // Preprocess the row to remove quotes and trim whitespace
      const cleanedRow = {};
      for (let key in row) {
        // Remove any leading/trailing whitespace and extraneous quotes
        cleanedRow[key.trim()] = row[key].trim().replace(/^"|"$/g, '');
      }
      // Push the cleaned row into the results array
      results.push(cleanedRow);
    })
    .on('end', async () => {
      try {
        for (const data of results) {
            try {
             
           
                // Create a new product based on the CSV data
                const news = new NewsBlog({
                    title: data.title,
                    content:data.content,
                    topic:data.topic,
                    imageUrl:data.imageUrl
                });

                // Save the product to the database
                await news.save();
                console.log(`News ${data.title} saved successfully.`);
            } catch (err) {
              
            }
        }


        res.status(200).send('CSV file processed and data saved successfully.');
      } catch (err) {
        next(new CustomError(err.message, 500));
      } finally {
       
        fs.unlinkSync(req.file.path);
      }
    });
};















export const AdminUploadNewsImagesFolder=async (req,res)=>{

  try {
    const files = req.files;
    const matchedFiles = [];
    const newsDir = path.join(__dirname, '../public/news');
 
    // Iterate over the uploaded files
    for (let file of files) {
       console.log(file)
        const news = await NewsBlog.findOne({ imageUrl: file.originalname });

        if (news) {
          const newFilename = `${Date.now()}-${file.originalname.replace(/ /g, '_')}`;

                const newPath = path.join(newsDir, newFilename);
                  console.log(newPath)


                // Move the file to the new location with the new name
                fs.rename(file.path, newPath, async(err) => {
                  if (err) {
                   
                } else {
                    
                 news.imageUrl=newFilename;
                  
                 await news.save()
                   





                }
                });


                matchedFiles.push({ ...file, newFilename });
            
        } else {
            // If no match, delete the file
            fs.unlinkSync(file.path);
        }
    }

    // If no files matched, send a response indicating no files were saved
    if (matchedFiles.length === 0) {
        return res.status(200).json({ message: 'No files matched with any News images.' });
    }else{
      for (let file of matchedFiles){
        console.log(matchedFiles)
        fs.unlinkSync(file.path);
      }
       
    }

    // Pass the matched files to the next middleware/controller
    

} catch (err) {
  next(new CustomError(err.message, 500));
}
}

