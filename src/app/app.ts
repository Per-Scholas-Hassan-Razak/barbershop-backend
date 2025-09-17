import { Request, Response } from "express";
import express from "express";
import barberRoutes from "../routes/barberRoutes";
import userRoutes from "../routes/userRoutes";
import queueRoutes from "../routes/queueRoutes";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // frontend dev server
    credentials: true, // allow cookies if you use them
  })
);

app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/barbers", barberRoutes);
app.use("/api/v1/queues", queueRoutes)

export default app;
