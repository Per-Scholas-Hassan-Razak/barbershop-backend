import { Request, Response } from 'express';
import express from 'express'
import barberRoutes from '../routes/barberRoutes';

const app = express()

app.use(express.json())
app.use('/api/v1/barbers', barberRoutes)

app.get("/", (req: Request, res: Response) => {
  res.json({ method: req.method, message: "Server is live 🚀" });
});




export default app



