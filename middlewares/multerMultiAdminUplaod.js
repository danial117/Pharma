import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Get current file directory
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

// Set storage engine
const AdminDir = path.join(__dirname, '../admin/files');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, AdminDir); // Folder where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Generate a unique filename
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
        cb('Error: Images Only!');
    }
}


