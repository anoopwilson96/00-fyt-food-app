import express from 'express'
import addRestaurant from '../../controllers/restaurantController.js'
const router = express.Router()

router.get('/test',(req,res)=>{ res.send('This is a test request')});

router.post('/add',addRestaurant);


export default router