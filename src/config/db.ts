import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const env = process.env.NODE_ENV || "development";

const URI =
  env === "production" ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV;

const connectDB = async () => {
  try {
     return await mongoose.connect(URI as string);
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;
