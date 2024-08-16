import express from 'express'
import { addRestaurant,getRestaurant,getAllRestaurants,deleteRestaurant,updateRestaurant } from '../../controllers/restaurantController.js';

const router = express.Router()

router.get('/test',(req,res)=>{ res.send('This is a test request')});

router.post('/add',addRestaurant);
router.get('/restaurant/:id',getRestaurant)
router.get('/all-restaurants',getAllRestaurants)
router.post('/delete',deleteRestaurant)
router.patch('/update',updateRestaurant)



export default router