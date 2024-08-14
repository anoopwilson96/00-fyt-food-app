import express from 'express'
import userRoute from './userRoute.js'

const v1Router = express.Router()

v1Router.use('/add',userRoute)

export default v1Router