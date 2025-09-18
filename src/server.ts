import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db";
import app from "./app/app";
import { seedHaircuts } from "./data/seed";
const PORT = process.env.PORT;

const env = process.env.NODE_ENV || "development";

connectDB().then((conn) => {
  app.listen(PORT, () => {
     console.log(
      `${env === "production" ? "Production" : "Development"} Server running at port ${PORT}`
    );
  });
});

