import express from 'express'
import { createBarber} from  '../controllers/barberController'

const router  = express.Router()

router.post('/', createBarber)


export default router;