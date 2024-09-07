import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import CustomError from '../utils/ErrorClass.js';
// Get current file directory
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

// Define base directories
const AdminDir = path.join(__dirname, '../admin/files');
const CMSDir = path.join(__dirname, '../public/CMS');

// Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Check if the route contains '/CMS'
        if (req.originalUrl.includes('/CMS')) {
            cb(null, CMSDir); // Store in CMS directory
        } else {
            cb(null, AdminDir); // Store in Admin directory
        }
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname.replace(/ /g, '_')}`);
    }
});

// Initialize Multer with the storage engine
export const multiUpload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit files to 10MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).any(); // 'files' is the field name, 10 is the maximum number of files

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /|png|/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new CustomError('Png allowed only', 500));
    }
}