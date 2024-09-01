import express from 'express'
import { addMenuItem, getAllMenuItems, getMenuItem,updateMenuItem } from '../../controllers/menuItemController.js';
import { upload } from '../../middlewares/uploadFile.js';
import {authAdmin}from '../../middlewares/authAdmin.js'
const router = express.Router()


router.get('/test',(req,res)=>{ res.send('This is a test request')});

router.post('/add',upload.single('image'),authAdmin,addMenuItem);
router.get('/get/:id',getMenuItem);
router.get('/all',getAllMenuItems);
router.patch('/update/:id',upload.single('image'),authAdmin,updateMenuItem);




export default router