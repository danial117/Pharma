import express from 'express';
import { GetProducts,GetProduct,AdminGetUserProducts,AdminDeleteProduct,AdminGetProduct,AdminModifyProduct,AdminCreateProduct, SearchProduct,SearchProductCategory } from '../controllers/product.js';
import { upload} from '../middlewares/multerConfig.js';
import { adminAuthenticateJwt } from '../middlewares/auth.js';
import { modifiedProductFile } from '../middlewares/fileModified.js';
import { deleteFileOnError } from '../middlewares/DeleteFilesOnError.js';


const router = express.Router();


router.get('/',GetProducts);
router.get('/id/:productId',GetProduct);

router.get('/search',SearchProduct)
router.get('/category/:search',SearchProductCategory)



//admin routes

router.get('/show',adminAuthenticateJwt,AdminGetUserProducts)
router.get('/show/:productId',adminAuthenticateJwt,AdminGetProduct)
router.put('/id/:productId',adminAuthenticateJwt,upload.single('file'),modifiedProductFile,AdminModifyProduct,deleteFileOnError)
router.post('/create',adminAuthenticateJwt,upload.single('file'),AdminCreateProduct,deleteFileOnError)
router.delete('/:productId',adminAuthenticateJwt,AdminDeleteProduct)








export default router;
