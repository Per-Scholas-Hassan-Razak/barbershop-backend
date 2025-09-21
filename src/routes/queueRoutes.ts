import express from 'express'
import { requireAuth } from '../auth/auth'
import { allQueues, barberHaircutsPublic, barberQueue, joinQueue, myQueuePosition } from '../controllers/queueController'

const router = express.Router()

router.use(requireAuth)


router.get("/", allQueues)
router.get("/:barberId", barberQueue)
router.get("/:barberId/haircuts", barberHaircutsPublic)
router.post("/:barberId/join", joinQueue)
router.get("/:barberId/my-position", myQueuePosition)

export default router