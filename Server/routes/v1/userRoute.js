import express from 'express'
import {addUser,userLogin, userLogout, userProfile} from '../../controllers/userController.js'
import { authUser } from '../../middlewares/authUser.js'
const router = express.Router()

router.get('/test',(req,res)=>{ res.send('This is a test request')})

router.post('/add',addUser)
router.post('/login',userLogin)
router.post('/logout',userLogout)
router.get('/profile/:id',authUser,userProfile)





export default router