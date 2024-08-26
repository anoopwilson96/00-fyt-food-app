import { Cart } from '../models/cartModel.js';
import { Dish } from '../models/dishModel.js';

export const addToCart = async (req, res, next) => {
  try {
    const { dishId, quantity } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId, status: 'active' });

    if (!cart) {
      cart = new Cart({ user: userId });
    }

    const dish = await Dish.findById(dishId);
    if (!dish) {
      return res.status(404).json({ success: false, message: 'Dish not found' });
    }


    const existingItem = cart.items.find(item => item.dish.equals(dishId));

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ dish: dishId, quantity, price: dish.price });
    }
    

    await cart.save();

    res.status(200).json({ success: true, message: 'Item added to cart', cart });

  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
  }
};

// Future function for Stripe payment integration
export const initiatePayment = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId, status: 'active' });
    if (!cart) {
      return res.status(400).json({ success: false, message: 'Your cart is empty' });
    }

    // Stripe payment processing would go here...

    res.status(200).json({ success: true, message: 'Payment initiated', paymentIntentId: cart.stripePaymentIntentId });

  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
  }
};
