import mongoose from 'mongoose';

const { Schema } = mongoose;


const menuItemSchema = new Schema({
  name:{
    type: String,
    
  },
  description: {
    type: String
  },
  restaurant: [{
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  }],
dish: [{
  type: Schema.Types.ObjectId,
  ref: 'Dish'
}],
image: {
  type: String,
  default: "https://res.cloudinary.com/aw96/image/upload/v1723921863/00-fyt-food-website/plceholder%20dish%20icon.jpg"
}
});

export const MenuItem = mongoose.model('MenuItem', menuItemSchema);
