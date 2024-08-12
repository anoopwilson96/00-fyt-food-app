import mongoose from 'mongoose';
import { Restaurant } from './restaurantModel';

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
        default: "https://res.cloudinary.com/aw96/image/upload/v1723449727/isolated-food-plate-fork-and-spoon-design-free-vector_ohak6c.jpg"
    },
    menu: {
        type: Schema.Types.ObjectId,
        ref: 'Menu'
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref:'Restaurant'
    }
});

export default mongoose.model('Dish', dishSchema);
