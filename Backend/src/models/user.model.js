import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
}, { timestamps: true })

// userSchema.pre("save", function(next) {})
// userSchema.post("save", function(next) {})

export const userModel = mongoose.model("users", userSchema)
