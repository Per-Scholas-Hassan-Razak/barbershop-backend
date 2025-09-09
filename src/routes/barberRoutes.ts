import express from 'express'
import { createBarber, getAllBarbers} from  '../controllers/barberController'

const router  = express.Router()

router.get('/', getAllBarbers)
router.post('/', createBarber)




export default router;