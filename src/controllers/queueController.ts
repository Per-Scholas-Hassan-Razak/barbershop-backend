import { Request, Response } from "express";
import {
  getAllQueues,
  getMyQueuePosition,
  getQueueByBarber,
  joinBarberQueue,
} from "../services/queueService";
import BarberHaircut from "../models/BarberHaircut";

export const allQueues = async (req: Request, res: Response) => {
  try {
    const queues = await getAllQueues();
    if (queues.length === 0) {
      return res.status(404).json({ message: "No open queues available" });
    }
    return res.status(200).json(queues);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: (err as Error).message });
  }
};

export const barberQueue = async (req: Request, res: Response) => {
  const { barberId } = req.params;

  try {
    const queue = await getQueueByBarber(barberId);
    if (!queue) {
      return res
        .status(404)
        .json({ message: `No open queues available for barber  ${barberId}` });
    }
    return res.status(200).json(queue);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: (err as Error).message });
  }
};

export const joinQueue = async (req: Request, res: Response) => {
  if (req.user.role !== "customer") {
    return res.status(403).json({ error: "Only customers can join a queue" });
  }
  const customerId = req.user.sub;
  const { barberId } = req.params;

  const { barberHaircut } = req.body;

  try {
    const queueData = await joinBarberQueue(
      barberId,
      customerId,
      barberHaircut
    );
    if (!queueData) {
      return res
        .status(404)
        .json({ message: `No open queues available for barber  ${barberId}` });
    }
    return res.status(200).json(queueData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: (err as Error).message });
  }
};

export const myQueuePosition = async (req: Request, res: Response) => {
  if (req.user.role !== "customerr") {
    return res
      .status(403)
      .json({ error: "Only customers can fetch wait times" });
  }
  const customerId = req.user.sub;

  const { barberId } = req.params;

  try {
    const waitTimeData = await getMyQueuePosition(barberId, customerId);
    if (!waitTimeData) {
      return res
        .status(404)
        .json({ message: "you are not in this barbers queue" });
    }
    return res.status(200).json(waitTimeData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: (err as Error).message });
  }
};

// queueController.ts
export const barberHaircutsPublic = async (req: Request, res: Response) => {
  const { barberId } = req.params;
  try {
    const haircuts = await BarberHaircut.find({ barber: barberId })
      .populate("haircutTemplate", "name baseCost baseDuration")
      .lean();
    return res.status(200).json(haircuts);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ err: (err as Error).message });
  }
};
