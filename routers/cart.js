import express from 'express';
import { AddToCart,DeleteCartItem,AdminGetUserCarts,incrementDecrementCartItem,GetUserCart } from '../controllers/cart.js';
import { verifyAccessToken, } from '../middlewares/auth.js';

const router = express.Router();



router.get('/create/:productId/:quantity',verifyAccessToken,AddToCart);
router.delete('/item/:productId',verifyAccessToken,DeleteCartItem)
router.get('/show',AdminGetUserCarts)
router.patch('/item/:productId', verifyAccessToken, incrementDecrementCartItem);
router.get('/',verifyAccessToken,GetUserCart)


export default router;
