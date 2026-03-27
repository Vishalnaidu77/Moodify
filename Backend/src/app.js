import 'dotenv/config.js'
import express from 'express'
import { connectToDb } from './config/dababase.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import cors from 'cors'
import songRouter from './routes/song.routes.js';

connectToDb()

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/songs", songRouter)
    
export default app;