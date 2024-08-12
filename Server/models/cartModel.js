import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    dish: {
      type: Schema.Types.ObjectId,
      ref: 'Dish',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  coupons: [{
    type: Schema.Types.ObjectId,
    ref: 'Coupon'
  }],
  totalDiscount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Cart = mongoose.model('Cart', cartSchema);
