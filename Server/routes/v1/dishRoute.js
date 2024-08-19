import express from 'express'
import {addDish,getDish,getAllDishes} from '../../controllers/dishController.js'
import { upload } from '../../middlewares/uploadFile.js';
const router = express.Router()

router.get('/test',(req,res)=>{ res.send('This is a test request')});

router.post('/add',upload.single('image'),addDish);
router.get('/get/:id',getDish)
router.get('/all',getAllDishes)
router.patch('/update/:id',upload.single('image'),getAllDishes)


export default router 

