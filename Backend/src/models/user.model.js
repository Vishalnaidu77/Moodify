import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        select: false
    }
}, { timestamps: true })

// userSchema.pre("save", function(next) {})
// userSchema.post("save", function(next) {})

export const userModel = mongoose.model("users", userSchema)
