

//RECHECK

import mongoose from 'mongoose';
import { User } from '../models/userModel.js'; // Assuming User model is in userModel.js
import { Restaurant } from '../models/restaurantModel.js'; // Assuming Restaurant model is in restaurantModel.js
import { Dish } from '../models/dishModel.js'; // Assuming Dish model is in dishModel.js
import { Order } from "../models/orderModel.js";

import { Order } from '../models/orderModel.js';

export const getOrderHistory = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, message: 'No orders found' });
    }

    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
