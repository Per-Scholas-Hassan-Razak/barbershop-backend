import express from 'express'
import { requireAuth } from '../auth/auth';
import { createHaircut,updateHaircut } from '../controllers/barberController';


const router  = express.Router()

router.use(requireAuth);

router.post("/:barberId/haircuts", createHaircut)
router.put("/:barberId/haircuts/:haircutId", updateHaircut)






export default router;