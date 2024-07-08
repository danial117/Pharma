

import express from 'express';
import { CreateUserOrder,getUserOrder,CreatePaypalOrder,CapturePaypalOrder,AdminGetUserOrders,getUserOrders } from '../controllers/order.js';
import { verifyAccessToken } from '../middlewares/auth.js';

const router = express.Router();



router.get('/createOrder/',verifyAccessToken,CreateUserOrder)
router.get('/',verifyAccessToken,getUserOrder)
router.post('/api',verifyAccessToken,CreatePaypalOrder);
router.get('/show',AdminGetUserOrders)
  // Route for capturing a PayPal order
router.post('http://localhost:3002/:orderId/capture',verifyAccessToken,CapturePaypalOrder);
router.get('/userOrders',verifyAccessToken,getUserOrders)

export default router;











