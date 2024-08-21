import express from 'express'
import { CustomerContact,AdminGetUserContacts,AdminGetContact,AdminDeleteContact} from '../controllers/customerContact.js';
import { adminAuthenticateJwt } from '../middlewares/auth.js';

const router=express.Router();


router.post('/request',CustomerContact)




//admin routes
router.get('/show',AdminGetUserContacts)
router.get('/show/:contactId',adminAuthenticateJwt,AdminGetContact)
router.delete('/:contactId',adminAuthenticateJwt,AdminDeleteContact)



export default router;




























































