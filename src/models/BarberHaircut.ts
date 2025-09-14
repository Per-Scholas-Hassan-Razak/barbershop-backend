import mongoose, { Schema, Document } from "mongoose";
import { BarberHaircutDocument } from "../types";

const barberHaircutSchema = new Schema({
  barber: { type: Schema.Types.ObjectId, ref: "User", required: true },
  haircutTemplate: { type: Schema.Types.ObjectId, ref: "HaircutTemplate", required: true },
  customPrice: { type: Number },        
  customDuration: { type: Number },     
  styleNotes: { type: String }          
}, { timestamps: true });

const BarberHaircut = mongoose.model<BarberHaircutDocument>("BarberHaircut", barberHaircutSchema);

export default BarberHaircut