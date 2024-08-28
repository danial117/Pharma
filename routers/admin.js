
import express from 'express'
import { AdminSearchQuery } from '../controllers/admin.js';
import { adminAuthenticateJwt } from '../middlewares/auth.js';
import { AdminLogin,VerifyOTP,AdminCsvFileHandling, AdminUploadImagesFolder } from '../controllers/admin.js';
import { upload } from '../middlewares/multerConfig.js';
import { multiUpload } from '../middlewares/MulterMultiAdminUplaod.js';


const router=express.Router()




router.get('/search/:model/:query',adminAuthenticateJwt,AdminSearchQuery)
router.post('/verify-otp',VerifyOTP)
router.post('/login',AdminLogin)
router.post('/csvFile',adminAuthenticateJwt,upload.single('file'),AdminCsvFileHandling)
router.post('/uploadFolder',adminAuthenticateJwt,multiUpload,AdminUploadImagesFolder)









export default router;









