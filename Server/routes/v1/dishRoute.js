import express from 'express'
import addDish from '../../controllers/dishController.js'
const router = express.Router()

router.get('/test',(req,res)=>{ res.send('This is a test request')});

router.post('/add',addDish);


export default router 

