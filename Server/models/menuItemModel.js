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
  menu: {
    type: Schema.Types.ObjectId,
    ref: 'Menu'
  }
});

export const MenuItem = mongoose.model('MenuItem', menuItemSchema);


