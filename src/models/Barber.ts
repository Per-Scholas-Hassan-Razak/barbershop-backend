import mongoose from "mongoose";

const barberSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    specialties: [{ type: String, trim: true }],
    available: { type: Boolean, default: true },
    shopName: { type: String, trim: true },
    bio: { type: String, trim: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    review: { type: String, trim: true },
  },
  { timestamps: true }
);

const Barber = mongoose.model("Barber", barberSchema);
export default Barber;
