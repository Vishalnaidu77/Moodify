import id3 from 'node-id3'
import { songUpload } from '../services/storage.service.js'
import { songModel } from '../models/song.model.js'

export async function songsController(req, res) {
    const { mood } = req.body
    const songBuffer = req.file.buffer

    const tags = id3.read(songBuffer)

    const postBuffer = tags.image?.imageBuffer

    const [ songFile, posterFile ] = await Promise.all([
        songUpload({
            buffer: songBuffer,
            filename: tags.title,
            folder: 'Moodify/songs'
        }),
        songUpload({
            buffer: postBuffer,
            filename: `${tags.title || 'poster'}-${Date.now()}.jpg`,
            folder: 'Moodify/posters'
        })
    ])

    console.log(tags);
    

    const song = await songModel.create({
        url: songFile.url,
        posterUrl: posterFile.url,
        title: tags.title,
        mood
    })

    res.status(200).json({
        message: "Song created",
        song
    })
} 