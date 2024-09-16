import mongoose from 'mongoose';
const { Schema } = mongoose;

const restaurantSchema = new Schema({

name:{
  type:String,
  required: true
},
cuisine: {
  type:String,
  required:true
},
location: {
  type: String,
  required: true
},
phone: {
  type: String,
  maxLength: 20
},
rating: {
  type: Number,
  min: 0,
  max: 5
},
image: {
  type: String,
  default: "https://res.cloudinary.com/aw96/image/upload/v1723441019/10047397_z9rayn.jpg"
},
menuItems:[{
  type: Schema.Types.ObjectId,
  ref: 'MenuItem',
  required: true
}]
})

export const Restaurant = mongoose.model('Restaurant', restaurantSchema);



