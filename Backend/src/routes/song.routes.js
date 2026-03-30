import express from "express"
import { getSongController } from "../controller/song.controller.js"

const songRouter = express.Router()

songRouter.get("/", getSongController)

export default songRouter
