import express from "express";
import { addToCart, cancelStatus, checkoutCart,getActiveCart, getCart, reOrder, updateCart } from "../../controllers/cartController.js";
import { authUser } from '../../middlewares/authUser.js'
const router = express.Router()

router.post('/add',authUser,addToCart);
router.get('/get',authUser,getCart);
router.post('/checkout',authUser,checkoutCart)
router.get('/active',authUser,getActiveCart)
router.put('/update',authUser,updateCart)
router.put('/cancel/:orderId',authUser,cancelStatus)
router.post('/reorder/:orderId',authUser,reOrder)
export default router
