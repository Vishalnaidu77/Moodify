import { userModel } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { blacklistModel } from "../models/blacklist.model.js";
import { redis } from "../config/cache.js";

export async function registerController(req, res) {
    const { username, email, password } = req.body;

    const isUserExist = await userModel.findOne({ 
        $or: [
            { email: email },
            { username: username}
        ]
    })

    if(isUserExist){
        return res.status(400).json({
            message: "User already exists with this email."
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign({
        email: user.email,
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: "3d" })

    res.cookie('token', token)
    
    res.status(201).json({
        message: "User register sucessfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    })
}

export async function loginController(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { email: email },
            { username: email }
        ]
    }).select("+password")

    if(!user){
        return res.status(400).json({
            message: "Invalid credential"
        })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        return res.status(400).json({
            message: "Invalid credential"
        })
    }

    const token = jwt.sign({
        email: user.email,
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: "3d" })

    res.cookie('token', token)

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

export async function logoutController(req, res){
    const user = req.user
    const token = req.cookies.token

    if(!user){
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    res.clearCookie('token')

    await redis.set(token, Date.now().toString())

    res.status(200).json({
        message: "User logged out"
    })
}

export async function getMeController(req, res) {
    const userId = req.user.id

    const user = await userModel.findById(userId)
    if(!user){
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    res.status(200).json({
        message: "Get user",
        user
    })
}