import express from 'express'
import addUser from '../../controllers/userController.js'
const router = express.Router()

router.post('/create',addUser)
router.get('/test',(req,res)=>{
 res.send('This is a test message')
})

export default router