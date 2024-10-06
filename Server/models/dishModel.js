import mongoose from 'mongoose';
import { Restaurant } from './restaurantModel.js';

const { Schema } = mongoose;

const dishSchema = new Schema({
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
    image: {
        type: String,
        default: "https://res.cloudinary.com/aw96/image/upload/v1723921863/00-fyt-food-website/plceholder%20dish%20icon.jpg"
    },

    menuItem: {
        type: Schema.Types.ObjectId,
        ref: 'MenuItem'
    }
});

export const Dish = mongoose.model('Dish', dishSchema);
