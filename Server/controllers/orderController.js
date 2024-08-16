

//RECHECK

import mongoose from 'mongoose';
import { User } from '../models/userModel.js'; // Assuming User model is in userModel.js
import { Restaurant } from '../models/restaurantModel.js'; // Assuming Restaurant model is in restaurantModel.js
import { Dish } from '../models/dishModel.js'; // Assuming Dish model is in dishModel.js
import { Order } from "../models/orderModel.js";


// Function to calculate total price of order items
const calculateTotalPrice = (items) => {
  return items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
};

// Function to create a new order
const createOrder = async (req, res, next) => {
  try {
    const { userId, restaurantId, items } = req.body;

    // Validate user and restaurant existence
    const user = await User.findById(userId);
    const restaurant = await Restaurant.findById(restaurantId);
    if (!user || !restaurant) {
      return res.status(400).json({ message: 'Invalid user or restaurant' });
    }

    // Validate dish existence and calculate price for each item
    const validatedItems = [];
    for (const item of items) {
      const dish = await Dish.findById(item.dish);
      if (!dish) {
        return res.status(400).json({ message: 'Invalid dish' });
      }
      validatedItems.push({
        dish: item.dish,
        quantity: item.quantity || 1, // Set default quantity to 1 if not provided
        price: dish.price,
      });
    }

    // Calculate total price
    const totalPrice = calculateTotalPrice(validatedItems);

    // Create a new order
    const order = new Order({
      user,
      restaurant,
      items: validatedItems,
      totalPrice,
      status: 'pending', // Set initial status to pending
    });

    // Save the order
    await order.save();

    return res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get all orders (optional)
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user', 'name').populate('restaurant', 'name'); // Populate user and restaurant details
    return res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to get a specific order by ID (optional)
const getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId).populate('user', 'name').populate('restaurant', 'name'); // Populate user and restaurant details
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Function to update order status (optional)
const updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId, status } = req.body;

    // Validate status update
    if (!['pending', 'accepted', 'rejected', 'delivered'].includes(status)) {
      return res.status(400).json({ message: 'Invalid order status' });
    }

    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true }); // Update and return the updated order

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    console.error(error);}
    return res.status(500).json({ message: 'Internal server error' })}