import express from 'express'
import { authUser } from '../../middlewares/authUser.js'
import {authAdmin} from '../../middlewares/authAdmin.js'
import { addCoupon, deleteCoupon, fetchActiveCoupons } from '../../controllers/couponController.js'
const router = express.Router()

router.get('/test',(req,res)=>{ res.send('This is a test request')})

router.post('/add',authAdmin,addCoupon)
router.get('/active',fetchActiveCoupons)
router.post('/delete',deleteCoupon)

export default router
