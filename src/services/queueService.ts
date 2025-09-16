import BarberHaircut from "../models/BarberHaircut";
import BarberQueue from "../models/BarberQueue";
import QueueEntry from "../models/QueueEntry";

export const getAllQueues = async () => {
  const queues = await BarberQueue.find({ isOpen: true }).populate(
    "barber",
    "username specialities"
  );
  return queues;
};

export const getQueueByBarber = async (barberId: string) => {
  const queue = await BarberQueue.findOne({
    barber: barberId,
    isOpen: true,
  }).populate("barber", "username specialities");
  if (!queue) return null;

  const entries = await QueueEntry.find({ queue: queue._id })
    .populate("customer", "username email")
    .populate("haircut", "customePrice  customeDuration styleNotes")
    .sort({ position: 1 });

  return { queue, entries };
};

export const joinBarberQueue = async (
  barberId: string,
  customerId: string,
  barberHaircut: string
) => {
  const queue = await BarberQueue.findOne({
    barber: barberId,
    isOpen: true,
  }).populate("barber", "username specialities");

  if (!queue) return null;

  await QueueEntry.create({
    queue: queue._id,
    customer: customerId,
    haircut: barberHaircut,
  });

  const entries = await QueueEntry.find({ queue: queue._id })
    .populate("customer", "username email")
    .populate("haircut", "customePrice  customeDuration styleNotes")
    .sort({ position: 1 });

  return { queue, entries };
};

export const getMyQueuePosition = async (
  barberId: string,
  customerId: string
) => {
  const myEntry = await QueueEntry.findOne({ customer: customerId })
    .populate("queue")
    .populate("haircut", "customDuration");

  if (!myEntry) return null;

  const entries = await QueueEntry.find({
    queue: myEntry.queue,
    status: "waiting",
  })
    .sort({ position: 1 })
    .populate("haircut", "customDuration");

    const ahead = entries.filter(e => {
        return (
            e.position < myEntry.position
        )
    })

    const waitTime = ahead.reduce((sum, 
        e:any) => sum + 
        (e.haircut?.customDuration || 0), 0
    
    )

    return {
        position:myEntry.position, 
        status:myEntry.status,
        estimatedWaitMinutes:waitTime
    }
};
