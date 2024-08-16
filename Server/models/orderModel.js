import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    items: [{
        dish: {
            type: Schema.Types.ObjectId,
            ref: 'Dish'
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: {
            type: Number
        }
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'delivered']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Order =  mongoose.model('Order', orderSchema);
