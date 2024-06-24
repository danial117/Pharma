



import express from 'express';

import { GetContent,AdminGetContent,AdminShowContent,AdminModifyContent } from '../controllers/content.js';
const router = express.Router();


router.get('/',GetContent)
router.get('/show/',AdminGetContent)
router.get('/show/:id',AdminShowContent)
router.put('/id/:id',AdminModifyContent)

export default router;
















