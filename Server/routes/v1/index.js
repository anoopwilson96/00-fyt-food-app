import express from 'express'
import userRoute from './userRoute.js'
import dishRoute from './dishRoute.js'
import menuItemRoute from './menuItemRoute.js'
import restaurantRoute from './restaurantRoute.js'

const v1Router = express.Router()

v1Router.use('/user',userRoute)
v1Router.use('/dish',dishRoute)
v1Router.use('/menu-item',menuItemRoute)
v1Router.use('/restaurant',restaurantRoute)


export default v1Router 