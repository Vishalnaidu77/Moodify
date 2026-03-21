import 'dotenv/config.js'
import express from 'express'
import { connectToDb } from './config/dababase.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';

connectToDb()

const app = express();
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)

export default app;