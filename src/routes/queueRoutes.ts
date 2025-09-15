import express from 'express'
import { requireAuth } from '../auth/auth'
import { allQueues } from '../controllers/queueController'

const router = express.Router()

router.use(requireAuth)


router.get("/", allQueues)

export default router