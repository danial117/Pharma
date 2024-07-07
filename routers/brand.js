import express from 'express';

const router = express.Router();
import { GetAdminBrands,AdminCreateBrand,GetBrands,GetBrandProducts } from '../controllers/brand.js';
import { upload } from '../middlewares/multerConfig.js';
router.get('/show',GetAdminBrands)
router.post('/create',upload.single('file'),AdminCreateBrand)
router.get('/',GetBrands)
router.get('/:brandId',GetBrandProducts)

export default router;
