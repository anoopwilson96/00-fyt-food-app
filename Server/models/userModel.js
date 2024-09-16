import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name:{
    type: String,
    required: true,
    maxLength: 50    
  },
  email:{
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30
  },
  password:{
    type:String,
    required:true,
    minLength:6
  },
  mobile: { 
    type: Number,
    maxLength: 10
},
image: {
  type: String,
  default:
      "https://res.cloudinary.com/aw96/image/upload/v1723432338/depositphotos_137014128-stock-illustration-user-profile-icon_a3ghy1.webp",
},
address: {
    type: String,
    },
cart: [{
    dish: {
        type: Schema.Types.ObjectId,
        ref: 'Dish'
    },
    quantity: {
        type: Number,
        default: 1
    }
}],
orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
}]
});

export const User = mongoose.model('User', userSchema);