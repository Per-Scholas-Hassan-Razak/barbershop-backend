import { Request, Response } from "express";
import express from "express";
import barberRoutes from "../routes/barberRoutes";
import userRoutes from "../routes/userRoutes";


const app = express();
app.use(express.json());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/barbers", barberRoutes);

export default app;
