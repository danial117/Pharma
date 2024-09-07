



import express from 'express'
import {Get_CMS_Data,Create_CMS_Data, AdminGetCMS} from '../controllers/CMS.js'
import { multiUpload } from '../middlewares/multerMultiAdminUplaod.js'




const router=express.Router()







router.get('/show',Get_CMS_Data)
router.put('/id/:id',multiUpload,Create_CMS_Data);

router.get('/show/:id',AdminGetCMS)






export default router;
