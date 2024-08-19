import express from 'express'
import { addMenuItem, getAllMenuItems, getMenuItem,updateMenuItem } from '../../controllers/menuItemController.js';
import { upload } from '../../middlewares/uploadFile.js';
import {authAdmin}from '../../middlewares/authAdmin.js'
const router = express.Router()


router.get('/test',(req,res)=>{ res.send('This is a test request')});

router.post('/add',authAdmin,upload.single('image'),addMenuItem);
router.get('/get/:id',getMenuItem);
router.patch('/update',authAdmin,updateMenuItem);
router.get('/all',getAllMenuItems);



export default router