import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const URI = process.env.MONGO_URI

const connectDB = async () => {
  console.log("URI -> : " ,URI)
  try {
     return await mongoose.connect(URI as string);
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
