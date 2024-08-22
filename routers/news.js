
import express from 'express'
import { AdminCreateNews, AdminDeleteNews, AdminGetAllNewsBlogs, AdminGetNewsBlog, AdminModifyNews, GetNews, GetNewsById } from '../controllers/news.js';
import { upload } from '../middlewares/multerConfig.js';
import { modifiedNewsFile } from '../middlewares/fileModified.js';
import { adminAuthenticateJwt } from '../middlewares/auth.js';
import { deleteFileOnError } from '../middlewares/DeleteFilesOnError.js';






const router=express.Router();



router.get('/',GetNews)
router.get('/id/:newsId',GetNewsById)



//Admin Routes
router.get('/show',adminAuthenticateJwt,AdminGetAllNewsBlogs)
router.get('/show/:newsId',adminAuthenticateJwt,AdminGetNewsBlog)
router.put('/id/:newsId',adminAuthenticateJwt,upload.single('file'),modifiedNewsFile,AdminModifyNews,deleteFileOnError)

router.post('/create',adminAuthenticateJwt,upload.single('file'),AdminCreateNews,deleteFileOnError)
router.delete('/:newsId',adminAuthenticateJwt,AdminDeleteNews)













export default router;



