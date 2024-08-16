import mongoose from 'mongoose';

const { Schema } = mongoose;

const couponSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  discountValue: {
    type: Number,
    required: true
  },
  expiryDate: {
    type: Date
  },
  minimumOrderValue: {
    type: Number
  },

  usageLimit: {
    type: Number
  },
  usersUsed: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

export const Coupon = mongoose.model('Coupon', couponSchema);
