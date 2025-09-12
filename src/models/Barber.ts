import mongoose from "mongoose";

const barberSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  specialties: [String],
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Barber = mongoose.model("Barber", barberSchema);
export default Barber;
