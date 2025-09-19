import { Request, Response } from "express";
import express from "express";
import barberRoutes from "../routes/barberRoutes";
import userRoutes from "../routes/userRoutes";
import queueRoutes from "../routes/queueRoutes";
import cors from "cors";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  // "https://your-frontend-name.onrender.com" 
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/barbers", barberRoutes);
app.use("/api/v1/queues", queueRoutes);

export default app;
