import express from "express";
import { requireAuth } from "../auth/auth";
import {
  createHaircut,
  updateHaircut,
  deleteHaircut,
  allHaircuts,
  openBarberQueue,
  closeBarberQueue,
} from "../controllers/barberController";

const router = express.Router();

router.use(requireAuth);

router.get("/haircuts", allHaircuts);
router.post("/haircuts", createHaircut);
router.put("/haircuts/:haircutId", updateHaircut);
router.delete("/haircuts/:haircutId", deleteHaircut);

router.post("/queue/open", openBarberQueue);
router.patch("/queue/close", closeBarberQueue);

export default router;
