import express from 'express'
import dotenv from 'dotenv';
import { databaseConfig } from './config/mongoConfig.js';
import apiRouter from './routes/index.js';
const app = express()
dotenv.config();

const port = process.env.PORT_NUMBER


//Router redirected to index.js(server)>index.js(router)>index.js(v1)
// localhost3000:api/v1/(needed routes) this is how url will be.
app.use('/api',apiRouter)


//mongoDB
databaseConfig()

 app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
