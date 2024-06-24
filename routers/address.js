import express from 'express';
import { createAddress,getUserAddresses,deleteAddress,GetAdminUserAddresses } from '../controllers/address.js';
import {verifyAccessToken} from '../middlewares/auth.js';

const router = express.Router();

router.post('/create', verifyAccessToken, createAddress);
router.get('/',verifyAccessToken,getUserAddresses)
router.delete('/', verifyAccessToken, deleteAddress);
router.get('/show',GetAdminUserAddresses)


export default router;