import express, { Request, Response } from 'express';
import connectDB from './config/db';
import barberRoutes from './routes/barberRoutes';


connectDB()
const app = express();
const port = 3000;


app.use(express.json())
app.use('/api/v1/barbers', barberRoutes)

app.get("/", (req: Request, res: Response) => {
  res.json({ method: req.method, message: "Server is live 🚀" });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});