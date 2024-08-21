import express from 'express';
import { AddToCart,DeleteCartItem,AdminGetUserCarts,incrementDecrementCartItem,GetUserCart } from '../controllers/cart.js';
import { adminAuthenticateJwt, verifyAccessToken, } from '../middlewares/auth.js';

const router = express.Router();



router.get('/create/:productId/:quantity',verifyAccessToken,AddToCart);
router.delete('/item/:productId',verifyAccessToken,DeleteCartItem)

router.patch('/item/:productId', verifyAccessToken, incrementDecrementCartItem);
router.get('/',verifyAccessToken,GetUserCart)







//routes
router.get('/show',adminAuthenticateJwt,AdminGetUserCarts)





export default router;
