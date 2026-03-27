import mongoose from 'mongoose'

const songSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        enum: ["Happy", "Sad", "Surprised"]
    }
})

export const songModel = mongoose.model("songs", songSchema)