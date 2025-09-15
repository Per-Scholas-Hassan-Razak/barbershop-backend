import BarberQueue from "../models/BarberQueue";

export const getAllQueues = async () => {
  const queues = await BarberQueue.find({ isOpen: true }).populate(
    "barber",
    "username specialities"
  );
  return queues;
};
