
import express from 'express'
import { AdminSearchQuery } from '../controllers/admin.js';
import { adminAuthenticateJwt } from '../middlewares/auth.js';
import { AdminLogin,VerifyOTP } from '../controllers/admin.js';




const router=express.Router()




router.get('/search/:model/:query',adminAuthenticateJwt,AdminSearchQuery)
router.post('/verify-otp',VerifyOTP)
router.post('/login',AdminLogin)









export default router;









