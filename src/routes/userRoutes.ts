import express from 'express'
import { registerNewUser, loginExistingUser } from '../controllers/userController';

const router  = express.Router()

router.post('/register', registerNewUser)
router.post('/login', loginExistingUser)


export default router