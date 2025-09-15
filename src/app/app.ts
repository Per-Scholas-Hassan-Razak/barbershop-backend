import { Request, Response } from "express";
import express from "express";
import barberRoutes from "../routes/barberRoutes";
import userRoutes from "../routes/userRoutes";
import queueRoutes from "../routes/queueRoutes";


const app = express();
app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/barbers", barberRoutes);
app.use("/api/v1/queues", queueRoutes)

export default app;
