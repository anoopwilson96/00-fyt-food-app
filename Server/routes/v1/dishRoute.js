import express from 'express'
import {addDish,getDish,getAllDishes, updateDish, deleteDish} from '../../controllers/dishController.js'
import { upload } from '../../middlewares/uploadFile.js';
import { authAdmin } from '../../middlewares/authAdmin.js';
const router = express.Router()

router.get('/test',(req,res)=>{ res.send('This is a test request')});

router.post('/add',upload.single('image'),authAdmin,addDish);
router.get('/get/:id',getDish)
router.get('/all',getAllDishes)
router.patch('/update/:id',upload.single('image'),authAdmin,updateDish)
router.delete('/delete/:id',deleteDish)


export default router 

