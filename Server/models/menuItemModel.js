import mongoose from 'mongoose';

const { Schema } = mongoose;


const menuItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  }
});

export const MenuItem = mongoose.model('MenuItem', menuItemSchema);


