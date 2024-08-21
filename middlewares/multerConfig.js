// middleware/upload.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get current file directory
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

// Define directories for different routes
const newsDir = path.join(__dirname, '../public/news');
const productsDir = path.join(__dirname, '../public/products/large');
const brandsDir = path.join(__dirname, '../public/brands');

// Create directories if they don't exist
if (!fs.existsSync(newsDir)) {
  fs.mkdirSync(newsDir, { recursive: true });
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
  } else {
    throw new Error('Invalid route for file upload');
  }
};

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
   
    try {
     
      const destinationFolder = getDestinationFolder(req);
      cb(null, destinationFolder);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
  
    cb(null, `${Date.now()}-${file.originalname.replace(/ /g, '_').replace('.png','_large.png')}`);
  },
});

// File filter to allow only certain file types
const fileFilter = (req, file, cb) => {
  try {
   
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  } catch (error) {
    
    cb(new Error('Error processing file'));
  }
};



// Initialize multer with storage and file filter
export const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // Limit file size to 5MB
  fileFilter: fileFilter,
});


