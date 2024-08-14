import express from 'express'
import v1Router from './v1/index.js';


const apiRouter = express.Router();


//Router redirected to index.js(v1)

apiRouter.use('/v1',v1Router)
// apiRouter.use('/v2', v1Router )
// apiRouter.use('/v3', v1Router )
// localhost3000:api/v1/(needed routes) this is how url will be.



export default apiRouter
