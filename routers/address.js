import express from 'express';
import { createAddress,getUserAddresses,deleteAddress,GetAdminUserAddresses } from '../controllers/address.js';
import {verifyAccessToken,adminAuthenticateJwt} from '../middlewares/auth.js';

const router = express.Router();

router.post('/create', verifyAccessToken, createAddress);





router.get('/',verifyAccessToken,getUserAddresses)
router.delete('/', verifyAccessToken, deleteAddress);

//admin routes
router.get('/show',adminAuthenticateJwt,GetAdminUserAddresses)


export default router;