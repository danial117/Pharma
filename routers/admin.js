
import express from 'express'
import { AdminNewsCsvFileHandling, AdminSearchQuery, AdminUploadNewsImagesFolder } from '../controllers/admin.js';
import { adminAuthenticateJwt } from '../middlewares/auth.js';
import { AdminLogin,VerifyOTP,AdminProductsCsvFileHandling, AdminUploadProductImagesFolder,AdminUploadBrandImagesFolder,AdminBrandsCsvFileHandling } from '../controllers/admin.js';
import { upload } from '../middlewares/multerConfig.js';
import { multiUpload } from '../middlewares/multerMultiAdminUplaod.js';
import {Get_CMS_Data,Create_CMS_Data, AdminGetCMS} from '../controllers/CMS.js'





const router=express.Router()




router.get('/search/:model/:query',adminAuthenticateJwt,AdminSearchQuery)
router.post('/verify-otp',VerifyOTP)
router.post('/login',AdminLogin)
router.post('/products/csvFile',adminAuthenticateJwt,upload.single('file'),AdminProductsCsvFileHandling)
router.post('/brands/csvFile',adminAuthenticateJwt,upload.single('file'),AdminBrandsCsvFileHandling)
router.post('/products/uploadFolder',adminAuthenticateJwt,multiUpload,AdminUploadProductImagesFolder)
router.post('/brands/uploadFolder',adminAuthenticateJwt,multiUpload,AdminUploadBrandImagesFolder)
router.post('/news/csvFile',adminAuthenticateJwt,upload.single('file'),AdminNewsCsvFileHandling)
router.post('/news/uploadFolder',adminAuthenticateJwt,multiUpload,AdminUploadNewsImagesFolder)





export default router;








