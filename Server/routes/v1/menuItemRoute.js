import express from 'express'
import { addMenuItem, getAllMenuItems, getMenuItem,updateMenuItem } from '../../controllers/menuItemController.js';
import { upload } from '../../middlewares/uploadFile.js';
const router = express.Router()


router.get('/test',(req,res)=>{ res.send('This is a test request')});

router.post('/add',upload.single('image'),addMenuItem);
router.get('/get/:id',getMenuItem);
router.patch('/update',updateMenuItem);
router.get('/all',getAllMenuItems);



export default router