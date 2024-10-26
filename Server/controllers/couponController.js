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


// Add a new coupon
export const addCoupon = async (req, res) => {
  try {
    const { code, discount, expirationDate } = req.body;

    // Check if the coupon code already exists
    const existingCoupon = await Coupon.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ success: false, message: 'Coupon code already exists' });
    }

    // Create a new coupon
    const newCoupon = new Coupon({
      code,
      discount,
      expirationDate,
      isActive: true,
    });

    await newCoupon.save();
    return res.status(201).json({ success: true, message: 'Coupon added successfully', coupon: newCoupon });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to add coupon' });
  }
};


// Fetch all active and non-expired coupons
export const fetchActiveCoupons = async (req, res) => {
  try {
    const currentDate = new Date();
    const activeCoupons = await Coupon.find({
      isActive: true,
      expirationDate: { $gte: currentDate }, // Fetch only unexpired coupons
    });

    return res.status(200).json({ success: true, coupons: activeCoupons });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to fetch coupons' });
  }
};


// Delete a coupon
export const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the coupon by ID
    const coupon = await Coupon.findById(id);

    if (!coupon) {
      return res.status(404).json({ success: false, message: 'Coupon not found' });
    }

    await coupon.remove();
    return res.status(200).json({ success: true, message: 'Coupon deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Failed to delete coupon' });
  }
};
