import express from 'express'
import { requireAuth } from '../auth/auth';
import { createHaircut,updateHaircut, deleteHaircut } from '../controllers/barberController';


const router  = express.Router()

router.use(requireAuth);

router.post("/:barberId/haircuts", createHaircut)
router.put("/:barberId/haircuts/:haircutId", updateHaircut)
router.delete("/:barberId/haircuts/:haircutId", deleteHaircut)






export default router;