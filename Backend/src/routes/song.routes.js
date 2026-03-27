import express from 'express'
import { upload } from '../middlewares/upload.middleware.js'
import { songsController } from '../controller/song.controller.js'

const songRouter = express.Router()

songRouter.post("/", upload.single("file"), songsController)

export default songRouter