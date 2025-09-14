import mongoose from "mongoose";
import dotenv from "dotenv";
import HaircutTemplate from "../models/HaircutTemplate";

dotenv.config();

export const seedHaircuts = async () => {
  const haircuts = [
    { name: "Fade", description: "Classic fade haircut", baseCost: 20, baseDuration: 30 },
    { name: "Buzz Cut", description: "Even length with clippers", baseCost: 15, baseDuration: 20 },
    { name: "Shape Up", description: "Line-up of hair edges", baseCost: 10, baseDuration: 15 },
    { name: "Beard Trim", description: "Trim and style beard", baseCost: 12, baseDuration: 20 },
  ];

  await HaircutTemplate.insertMany(haircuts);
  console.log("✅ Haircut templates seeded!");
};

// SEEDING HAIRCUT TEMPLATES ADD TO SERVER.JS IF WANT TO USE AGAIN
// connectDB().then((conn) => {
//   app.listen(PORT, () => {
//       env === "production"
//         ? seedHaircuts()
//         : seedHaircuts()
//   });
// });