

import express from 'express';
import { CreateUserOrder,getUserOrder,CreatePaypalOrder,CapturePaypalOrder,AdminGetUserOrders,getUserOrders,OrderTaxRate, AdminGetOrder, AdminModifyOrders } from '../controllers/order.js';
import { verifyAccessToken,adminAuthenticateJwt } from '../middlewares/auth.js';
import Order from '../models/OrderModel.js';

const router = express.Router();



router.get('/createOrder/',verifyAccessToken,CreateUserOrder)
router.get('/',verifyAccessToken,getUserOrder)
router.post('/api',verifyAccessToken,CreatePaypalOrder);

//admin routes
router.get('/show',adminAuthenticateJwt,AdminGetUserOrders)
router.get('/show/:orderId',adminAuthenticateJwt,AdminGetOrder)
router.put('/id/:orderId',adminAuthenticateJwt,AdminModifyOrders)

  // Route for capturing a PayPal order
router.post('/api/:orderId/capture',verifyAccessToken,CapturePaypalOrder);
router.get('/userOrders',verifyAccessToken,getUserOrders)





router.get('/tax',verifyAccessToken,OrderTaxRate)

export default router;











