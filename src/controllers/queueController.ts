import { Request, Response } from "express";
import { getAllQueues } from "../services/queueService";

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
