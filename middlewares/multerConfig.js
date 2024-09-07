// middleware/upload.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import CustomError from '../utils/ErrorClass.js';
// Get current file directory
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

// Define directories for different routes
const newsDir = path.join(__dirname, '../public/news');
const productsDir = path.join(__dirname, '../public/products/large');
const brandsDir = path.join(__dirname, '../public/brands');
const AdminDir = path.join(__dirname, '../admin/files');

// Create directories if they don't exist
if (!fs.existsSync(newsDir)) {
  fs.mkdirSync(newsDir, { recursive: true });
}
if (!fs.existsSync(AdminDir)) {
  fs.mkdirSync(AdminDir, { recursive: true });
}

if (!fs.existsSync(productsDir)) {
  fs.mkdirSync(productsDir, { recursive: true });
}

// Function to determine the upload directory based on request URL
const getDestinationFolder = (req) => {
 
  if (req.originalUrl.startsWith('/news/')) {
    return newsDir;
  } else if (req.originalUrl.startsWith('/products/')) {
    return productsDir;
  }else if (req.originalUrl.startsWith('/brands/')) {
    return brandsDir;
  } else if(req.originalUrl.startsWith('/admin')){
    return AdminDir;
  } {
    (new CustomError('Invalid Router for multer file processing', 500))
  }
};

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
   
    try {
     
      const destinationFolder = getDestinationFolder(req);
      cb(null, destinationFolder);
    } catch (err) {
      cb(new CustomError(err.message, 500));
    }
  },
  filename: (req, file, cb) => {
    if(req.originalUrl.startsWith('/admin')){
      cb(null, `${Date.now()}-${file.originalname}`);
    }
    else{
      cb(null, `${Date.now()}-${file.originalname.replace(/ /g, '_').replace('.png','_large.png')}`);
    }
   
  },
});

// File filter to allow only certain file types
const fileFilter = (req, file, cb) => {
  try {
   
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const csvAllowedTypes=/csv/;
    const CsvExtname = csvAllowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    const CSVmimetype = csvAllowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    else if (CsvExtname && CSVmimetype) {
      return cb(null, true);
    }

    
    else {
      cb(new CustomError('Extension unallowed', 500));
    }
  } catch (err) {
    
    cb(new CustomError(err.message, 500));
  }
};



// Initialize multer with storage and file filter
export const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // Limit file size to 5MB
  fileFilter: fileFilter,
});


