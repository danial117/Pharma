import express from 'express';
import { GetProducts,GetProduct,AdminGetUserProducts,AdminGetProduct,AdminModifyProduct,AdminCreateProduct, SearchProduct } from '../controllers/product.js';
import { upload } from '../middlewares/multerConfig.js';

const router = express.Router();


router.get('/',GetProducts);
router.get('/id/:productId',GetProduct);
router.get('/show',AdminGetUserProducts)
router.get('/show/:productId',AdminGetProduct)
router.put('/id/:productId',AdminModifyProduct)
router.post('/create',upload.single('file'),AdminCreateProduct)
router.get('/search',SearchProduct)



export default router;
