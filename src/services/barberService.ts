import BarberHaircut from "../models/BarberHaircut";
import HaircutTemplate from "../models/HaircutTemplate";
import User from "../models/User";
import {
  BarberHaircutDocument,
  CreateHaircutInput,
  UpdateBarberHaircutParams,
} from "../types";

import mongoose from "mongoose";

export const createCustomHaircut = async (
  data: CreateHaircutInput
): Promise<BarberHaircutDocument> => {
  /*
        1. receive barberid and check to see if the barber exists
        2. pull the haircut template from the database
        3. use the template to create a custom haircut with price time and description
        from req body 
        4. return the haircut and assign it to the barberId for future pulling
    */

  const { barberId, haircutTemplate, customPrice, customDuration, styleNotes } =
    data;
  const barber = await User.findById(barberId);

  if (!barber) {
    throw new Error("Barber Not Found");
  }

  const template = await HaircutTemplate.findById(haircutTemplate);
  if (!template) {
    throw new Error("Haircut Template not found");
  }

  const barberHaircut = await BarberHaircut.create({
    barber: barberId,
    haircutTemplate,
    customPrice,
    customDuration,
    styleNotes,
  });

  const result = await BarberHaircut.findById(barberHaircut._id).populate(
    "haircutTemplate",
    "name description baseCost baseDuration"
  );

  if (!result) {
    throw new Error("BarberHaircut not found after creation");
  }

  return result;
};

export const updateBarberHaircut = async (
  barberId: string,
  haircutId: string,
  updates: UpdateBarberHaircutParams
): Promise<BarberHaircutDocument> => {
  const barberHaircut = await BarberHaircut.findOneAndUpdate(
    { _id: haircutId, barber: barberId },
    { $set: updates },
    { new: true }
  ).populate("haircutTemplate", "name description baseCost baseDuration");

  if (!barberHaircut) {
    throw new Error(
      "Haircut not found or your do not have permission to update"
    );
  }

  return barberHaircut;
};

export const deleteCustomHaircut = async (
  barberId: string,
  haircutId: string
) => {
  const barberHaircut = await BarberHaircut.findOneAndDelete({
    _id: haircutId,
    barber: barberId,
  });
  if (!barberHaircut) {
    throw new Error(
      "Haircut not found or you do not have permission to delete"
    );
  }

  return barberHaircut;
};

export const getAllHaircuts = async (
  barberId: string
): Promise<BarberHaircutDocument[]> => {
  if (!barberId || !mongoose.Types.ObjectId.isValid(barberId)) {
    throw new Error("Invalid barber Id");
  }
  return await BarberHaircut.find({ barber: barberId })
    .populate("haircutTemplate", "name description baseCost baseDuration")
    .lean();
};
