import express from 'express'
import { getMeController, loginController, logoutController, registerController } from '../controller/auth.controller.js'
import { identifyUser } from '../middlewares/auth.middleware.js'

const authRouter = express.Router()

authRouter.post("/register", registerController)
authRouter.post("/login", loginController)
authRouter.get("/get-me", identifyUser, getMeController)
authRouter.post("/logout", identifyUser, logoutController)

export default authRouter;
