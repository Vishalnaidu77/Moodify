import axios from 'axios'
import { getApiBaseUrl } from '../../features/shared/apiBaseUrl'

const api = axios.create({
  baseURL: getApiBaseUrl('/api/songs')
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
