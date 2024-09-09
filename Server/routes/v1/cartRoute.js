import express from "express";
import { addToCart, checkoutCart,getActiveCart, getCart, updateCart } from "../../controllers/cartController.js";
import { authUser } from '../../middlewares/authUser.js'
const router = express.Router()

router.post('/add',authUser,addToCart);
router.get('/get',authUser,getCart);
router.post('/checkout',authUser,checkoutCart)
router.get('/active',authUser,getActiveCart)
router.put('/update',authUser,updateCart)

export default router
