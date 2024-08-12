import mongoose from 'mongoose';

const { Schema } = mongoose;

const couponSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
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
  maximumDiscount: {
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
