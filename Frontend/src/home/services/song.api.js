import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/songs'
})

export async function getSongsByMood(mood) {
  const response = await api.get('/', {
    params: { mood }
  })

  return {
    ...response.data,
    songs: (response.data.songs || []).map((song) => ({
      ...song,
      artist: song.artist || 'Unknown artist',
      posterUrl: song.posterUrl || ''
    }))
  }
}
