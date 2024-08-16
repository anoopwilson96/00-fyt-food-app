import express from 'express'
import dotenv from 'dotenv';
import { databaseConfig } from './config/mongoConfig.js';
import apiRouter from './routes/index.js';
import cookieParser from 'cookie-parser';

const app = express()
dotenv.config();
const port = process.env.PORT_NUMBER

//Middlewares
app.use(cookieParser())
app.use(express.json())

//Route Handlers
app.use('/api',apiRouter)  //Router redirected to index.js(server)>index.js(router)>index.js(v1) ie. localhost3000:api/v1/(needed routes) this is how url will be.


//mongoDB
databaseConfig()

 app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
