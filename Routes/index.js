import { Router } from 'express'
import AuthRouters from './Auth.routes.js'

const router = Router();

router.use('/auth' , AuthRouters) 


export default router