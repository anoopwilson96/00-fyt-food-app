// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// const orderSchema = new Schema({
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     items: [
//         {
//             dish: {
//                 type: Schema.Types.ObjectId,
//                 ref: 'Dish',
//                 required: true
//             },
//             quantity: {
//                 type: Number,
//                 required: true
//             },
//             price: {
//                 type: Number,
//                 required: true
//             }
//         }
//     ],
//     totalAmount: {
//         type: Number,
//         required: true
//     },
//     status: {
//         type: String,
//         enum: ['pending', 'paid', 'cancelled'],
//         default: 'pending'
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     }
// });



// export const Order =  mongoose.model('Order', orderSchema);
