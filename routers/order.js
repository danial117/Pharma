

import express from 'express';
import { CreateUserOrder,getUserOrder,CreatePaypalOrder,CapturePaypalOrder,AdminGetUserOrders } from '../controllers/order.js';
import { verifyAccessToken } from '../middlewares/auth.js';

const router = express.Router();



router.get('/createOrder/',verifyAccessToken,CreateUserOrder)
router.get('/',verifyAccessToken,getUserOrder)
router.post('/api',verifyAccessToken,CreatePaypalOrder);
router.get('/show',AdminGetUserOrders)
  // Route for capturing a PayPal order
router.post('/api/:orderId/capture',verifyAccessToken,CapturePaypalOrder);

export default router;











