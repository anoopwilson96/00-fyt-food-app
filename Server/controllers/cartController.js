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





//Get ACTIVE carts

export const getActiveCart = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    // Find the active cart for the user
    const cart = await Cart.findOne({ user: userId, status: 'active' }).populate('restaurant').populate('items.dish')


    if (!cart) {
      return res.status(200).json({ 
        success: true, 
        message: 'No active cart found', 
        });
    }

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

    const cart = await Cart.find({ user: userId}).populate('items.dish')
   

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Your cart is empty' });
    }

    res.status(200).json({ success: true, cart });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
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


