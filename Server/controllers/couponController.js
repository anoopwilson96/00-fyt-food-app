import { Coupon } from '../models/couponModel.js';
import { Cart } from '../models/cartModel.js';

export const applyCoupon = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { code } = req.body;

    const coupon = await Coupon.findOne({ code, isActive: true, expirationDate: { $gte: new Date() } });
    if (!coupon) {
      return res.status(400).json({ success: false, message: 'Invalid or expired coupon' });
    }

    const cart = await Cart.findOne({ user: userId, status: 'active' });
    if (!cart) {
      return res.status(400).json({ success: false, message: 'No active cart found' });
    }

    const discountAmount = (coupon.discount / 100) * cart.total;
    cart.total -= discountAmount;
    await cart.save();

    res.status(200).json({ success: true, message: 'Coupon applied successfully', data: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
