import express from 'express'
import userRoute from './userRoute.js'
import dishRoute from './dishRoute.js'
import menuItemRoute from './menuItemRoute.js'
import restaurantRoute from './restaurantRoute.js'
import adminRoute from './adminRoute.js'
import cartRoute from './cartRoute.js'
import razorpayRoute from '../v1/razorpayRoute.js'
import couponRoute from './couponRoute.js'

const v1Router = express.Router()

v1Router.use('/user',userRoute)
v1Router.use('/dish',dishRoute)
v1Router.use('/menu-item',menuItemRoute)
v1Router.use('/restaurant',restaurantRoute)
v1Router.use('/manage',adminRoute)
v1Router.use('/cart',cartRoute)
v1Router.use('/payment',razorpayRoute)
v1Router.use('/coupon',couponRoute)



export default v1Router 