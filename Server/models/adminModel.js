import mongoose from 'mongoose';
const { Schema } = mongoose;

const adminSchema = new Schema({
  name:{
    type: String,
    required: true,
    maxLength: 50    
  },
  role:{
    type: String,
    enum: ['admin','restaurant','delivery','none']   
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
    maxLength: 10,
    required: true
}
});

export const Admin = mongoose.model('Admin', adminSchema);