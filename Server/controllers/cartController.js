import { Cart } from '../models/cartModel.js';
import { Dish } from '../models/dishModel.js';



//ADD to CART
export const addToCart = async (req, res, next) => {
  try {
    const { dishId, quantity } = req.body;
    const userId = req.user.userId;
    const restaurantId = req.body.restaurantId;
    
    // Find the active cart for the user
    let cart = await Cart.findOne({ user: userId, status: 'active' });

    // Find the dish by its ID
    const dish = await Dish.findById(dishId);
    if (!dish) {
      return res.status(404).json({ success: false, message: 'Dish not found' });
    }

    // Check if the dish's restaurant matches the current cart's restaurant
    if (cart && cart.restaurant && !cart.restaurant.equals(restaurantId)) {
      // Clear the cart if it's from a different restaurant
      cart.items = [];
      cart.status = null;
      cart.restaurant = null;
      await cart.save();
    }

    // If no cart exists or cleared, create a new one
    if (!cart || !cart.restaurant) {
      cart = new Cart({ user: userId, restaurant: restaurantId });
    }

    // Check if the dish already exists in the cart
    const existingItem = cart.items.find(item => item.dish.equals(dishId));

    if (existingItem) {
      // If it exists, increase the quantity
      existingItem.quantity += quantity;
    } else {
      // If not, add it to the cart
      cart.items.push({ dish: dishId, quantity, price: dish.price });
    }

    // Save the cart with updated items
    await cart.save();

    res.status(200).json({ success: true, message: 'Item added to cart', cart });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};






export const getActiveCart = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    // Step 1: Delete any carts with status 'null' for the user
    await Cart.deleteMany({ user: userId, status: 'null' });

    // Step 2: Find the active cart for the user
    const cart = await Cart.findOne({ user: userId, status: 'active' })
      .populate('restaurant')
      .populate('items.dish');

    if (!cart) {
      return res.status(200).json({ 
        success: true, 
        message: 'No active cart found', 
      });
    }

    // Step 3: Return the active cart
    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};





// View All Carts

export const getCart = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const cart = await (await Cart.find({ user: userId}).populate('items.dish').populate('restaurant'))
   

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Your cart is empty' });
    }

    res.status(200).json({ success: true, cart });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};




// Update Cart 

export const updateCart = async (req, res) => {
  try {
    const userId = req.user.userId;  // Assuming you're using a middleware to authenticate users
    const { items } = req.body; // Frontend will send updated items

    // Find the user's active cart
    const cart = await Cart.findOne({ user: userId, status: 'active' });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // Update the cart's items
    cart.items = items;

    // Recalculate subtotal, tax, and total
    cart.subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cart.tax = cart.subtotal * 0.1; // Assuming a 10% tax rate
    cart.total = cart.subtotal + cart.tax;

    // Save the updated cart
    await cart.save();

    res.status(200).json({ success: true, message: 'Cart updated successfully', cart });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};




export const checkoutCart = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    // Find the user's active cart
    const cart = await Cart.findOne({ user: userId, status: 'active' });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // Update the cart status to 'ordered'
    cart.status = 'ordered';
    cart.orderedAt = new Date(); // Add a timestamp for when the order was placed

    await cart.save();

    res.status(200).json({ success: true, message: 'Order placed successfully', order: cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


