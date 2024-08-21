
import express from 'express'
import { AdminCreateNews, AdminDeleteNews, AdminGetAllNewsBlogs, AdminGetNewsBlog, AdminModifyNews, GetNews, GetNewsById } from '../controllers/news.js';
import { upload } from '../middlewares/multerConfig.js';
import { modifiedNewsFile } from '../middlewares/fileModified.js';

const router=express.Router();



router.get('/',GetNews)
router.get('/id/:newsId',GetNewsById)



//Admin Routes
router.get('/show',AdminGetAllNewsBlogs)
router.get('/show/:newsId',AdminGetNewsBlog)
router.put('/id/:newsId',upload.single('file'),modifiedNewsFile,AdminModifyNews)

router.post('/create',upload.single('file'),AdminCreateNews)
router.delete('/:newsId',AdminDeleteNews)













export default router;



