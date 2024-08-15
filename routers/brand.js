import express from 'express';

const router = express.Router();
import { GetAdminBrands,AdminCreateBrand,GetBrands,GetBrandProducts, AdminModifyBrand, AdminGetBrand, AdminDeleteBrand } from '../controllers/brand.js';
import { upload } from '../middlewares/multerConfig.js';
import { modifiedBrandFile } from '../middlewares/fileModified.js';




router.get('/',GetBrands)
router.get('/:brandName',GetBrandProducts)




//Admin Routes

router.post('/create',upload.single('file'),AdminCreateBrand)
router.get('/show',GetAdminBrands)
router.get('/show/:brandId',AdminGetBrand)
router.put('/id/:brandId',upload.single('file'),modifiedBrandFile,AdminModifyBrand)
router.delete('/:brandId',AdminDeleteBrand)













export default router;
