import express from 'express'
import addUser from '../../controllers/userController.js'
const router = express.Router()

router.get('/test',(req,res)=>{ res.send('This is a test request')})

router.post('/add',addUser)





export default router