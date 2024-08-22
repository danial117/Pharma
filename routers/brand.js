import express from 'express';

const router = express.Router();
import { GetAdminBrands,AdminCreateBrand,GetBrands,GetBrandProducts, AdminModifyBrand, AdminGetBrand, AdminDeleteBrand } from '../controllers/brand.js';
import { upload } from '../middlewares/multerConfig.js';
import { modifiedBrandFile } from '../middlewares/fileModified.js';

import { adminAuthenticateJwt } from '../middlewares/auth.js';
import { deleteFileOnError } from '../middlewares/DeleteFilesOnError.js';

router.get('/',GetBrands)
router.get('/name/:brandName',GetBrandProducts)




//Admin Routes

router.post('/create',adminAuthenticateJwt,upload.single('file'),AdminCreateBrand,deleteFileOnError)
router.get('/show',adminAuthenticateJwt,GetAdminBrands)
router.get('/show/:brandId',adminAuthenticateJwt,AdminGetBrand)
router.put('/id/:brandId',adminAuthenticateJwt,upload.single('file'),modifiedBrandFile,AdminModifyBrand,deleteFileOnError)
router.delete('/:brandId,',adminAuthenticateJwt,AdminDeleteBrand)













export default router;
