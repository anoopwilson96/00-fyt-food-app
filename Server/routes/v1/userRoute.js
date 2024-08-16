import express from 'express'
import {addUser,userLogin, userLogout} from '../../controllers/userController.js'
const router = express.Router()

router.get('/test',(req,res)=>{ res.send('This is a test request')})

router.post('/add',addUser)
router.post('/login',userLogin)
router.post('/logout',userLogout)





export default router