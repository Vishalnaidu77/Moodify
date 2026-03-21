import { userModel } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
        username: username,
        email: email,
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

    const user = await userModel.fineOne({
        $or: [
            { email: email },
            { username: email }
        ]
    })

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