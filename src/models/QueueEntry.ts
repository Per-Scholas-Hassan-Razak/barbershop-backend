import mongoose, { Schema } from "mongoose";
import { QueueEntryDocument } from "../types";

const queueEntrySchema = new Schema<QueueEntryDocument>(
  {
    queue:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"BarberQueue", 
      required:true
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    haircut: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BarberHaircut",
      required: true,
    },
    position: {
      type: Number
    },
    status: {
      type: String,
      enum: ["waiting", "in_progress", "completed", "cancelled"],
      default: "waiting",
    },
  },
  { timestamps: true }
);

queueEntrySchema.pre("save", async function (next) {
  if (this.isNew) {
    const count = await mongoose.model("QueueEntry").countDocuments({
      queue: this.queue,
      status: "waiting",
    });
    this.position = count + 1;
  }
  next();
});

const Queue = mongoose.model<QueueEntryDocument>("QueueEntry", queueEntrySchema);

export default Queue;
