import mongoose from 'mongoose';

const { Schema } = mongoose;

const menuSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  },
  menuItems: [{
    type: Schema.Types.ObjectId,
    ref: 'MenuItem'
  }]
});


 export const Menu = mongoose.model('Menu', menuSchema);



