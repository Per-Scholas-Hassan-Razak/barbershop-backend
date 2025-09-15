import mongoose, {Schema} from 'mongoose'
import { BarberQueueDocument } from "../types";

const barberQueueSchema = new Schema<BarberQueueDocument>(
  {
    barber: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isOpen: { type: Boolean, default: true },
    startedAt: { type: Date, default: Date.now },
    closedAt: { type: Date },
  },
  { timestamps: true }
);

const BarberQueue = mongoose.model<BarberQueueDocument>("BarberQueue", barberQueueSchema);
export default BarberQueue;