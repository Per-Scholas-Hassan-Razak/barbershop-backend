import express from 'express'
import { registerNewUser } from '../controllers/userController';

const router  = express.Router()

router.post('/register', registerNewUser)


export default router