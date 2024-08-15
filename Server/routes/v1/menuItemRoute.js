import express from 'express'
import addMenuItem from '../../controllers/menuItemController.js'
const router = express.Router()

router.get('/test',(req,res)=>{ res.send('This is a test request')});

router.post('/add',addMenuItem);


export default router