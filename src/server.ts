import dotenv from "dotenv"
dotenv.config()
import connectDB from './config/db';
import app from "./app/app"
const PORT = process.env.PORT

const env = process.env.NODE_ENV || "development";



connectDB()
.then((conn) => {
  app.listen(PORT, () => {
    const connectionString = env === 'production' 
                        ? console.log(`Server running at ${conn.connection.host}`)
                        :console.log(`Server running at http://localhost:${PORT}`)
  });
})

