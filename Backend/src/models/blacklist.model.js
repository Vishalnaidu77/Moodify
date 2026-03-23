import mongoose from "mongoose";

const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        require: true
    }
}, { timestamps: true})

export const blacklistModel = mongoose.model("blacklist", blacklistSchema)