import mongoose, { Schema, Document } from "mongoose";
import { HaircutTemplateDocument } from "../types";

const haircutTemplateSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String },
  baseCost: { type: Number, required: true, min: 1 },
  baseDuration: { type: Number, required: true, min: 5 },
}, { timestamps: true });

const HaircutTemplate = mongoose.model<HaircutTemplateDocument>("HaircutTemplate", haircutTemplateSchema);

export default HaircutTemplate