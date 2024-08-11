import express from 'express'
import v1Router from './v1/index.js';


const apiRouter = express.Router();


//Router redirected to index.js(v1)
// localhost3000:api/v1/(needed routes) this is how url will be.
apiRouter.use('/v1',v1Router)



export default apiRouter