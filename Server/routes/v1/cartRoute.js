import express from "express";
import { addToCart, checkoutCart,getActiveCart, getCart } from "../../controllers/cartController.js";
import { authUser } from '../../middlewares/authUser.js'
const router = express.Router()

router.post('/add',authUser,addToCart);
router.get('/get',authUser,getCart);
router.get('/checkout',authUser,checkoutCart)
router.get('/active',authUser,getActiveCart)

export default router
