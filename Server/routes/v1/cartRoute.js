import express from "express";
import { addToCart, checkoutCart, clearCart, getActiveCart, getCart, getPreviousOrders } from "../../controllers/cartController.js";
import { authUser } from '../../middlewares/authUser.js'
const router = express.Router()

router.post('/add',authUser,addToCart);
router.get('/get',authUser,getCart);
router.patch('/clear',authUser,clearCart);
router.get('/history',authUser,getPreviousOrders);
router.get('/checkout',authUser,checkoutCart)
router.get('/active',authUser,getActiveCart)

export default router
