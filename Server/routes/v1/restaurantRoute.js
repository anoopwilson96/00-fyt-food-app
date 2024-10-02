import express from 'express'
import { addRestaurant,getRestaurant,getAllRestaurants,deleteRestaurant,updateRestaurant } from '../../controllers/restaurantController.js';
import { upload } from '../../middlewares/uploadFile.js';
import {authAdmin} from '../../middlewares/authAdmin.js'
import multer from 'multer';

const router = express.Router()

router.get('/test',(req,res)=>{ res.send('This is a test request')});

router.post('/add',upload.single('image'),authAdmin,addRestaurant);
router.get('/get/:id',getRestaurant)
router.get('/all',getAllRestaurants)
router.delete('/delete',authAdmin,deleteRestaurant)
router.patch('/update/:id',upload.single('image'),authAdmin,updateRestaurant)



export default router