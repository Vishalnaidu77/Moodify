import { getSongsByMood } from '../services/song.service.js'

export async function getSongController(req, res) {
  try {
    const { mood } = req.query
    const songs = await getSongsByMood(mood)

    res.status(200).json({
      message: "Songs fetched successfully",
      songs,
      mood
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}
