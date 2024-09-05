import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import cors from 'cors'
import { databaseConfig } from './config/mongoConfig.js';
import apiRouter from './routes/index.js';
import cookieParser from 'cookie-parser';

const app = express()

app.use(cors({
  origin: [
    "https://00-fyt-food-app.vercel.app",
    "http://localhost:5173"
  ],
 credentials: true
}))
app.use(express.json())
app.use(cookieParser())



const port = process.env.PORT_NUMBER

//Route Handlers
app.use('/api',apiRouter)  //Router redirected to index.js(server)>index.js(router)>index.js(v1) ie. localhost3000:api/v1/(needed routes) this is how url will be.


//mongoDB
databaseConfig()

 app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

