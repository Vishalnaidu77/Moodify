import { useContext } from 'react'
import { SongProvider } from '../SongContext'
import { getSongsByMood } from '../services/song.api'

const useSong = () => {
  const {
    songs,
    setSongs,
    selectedSong,
    setSelectedSong,
    selectedMood,
    setSelectedMood,
    loading,
    setLoading,
    error,
    setError
  } = useContext(SongProvider)

  const handleGetSongBasedOnMood = async (mood) => {
    if (!mood) {
      return []
    }

    setLoading(true)
    setError('')
    setSelectedMood(mood)

    try {
      const res = await getSongsByMood(mood)
      const nextSongs = res.songs || []

      setSongs(nextSongs)
      setSelectedSong(nextSongs[0] || null)

      if (!nextSongs.length) {
        setError(`No songs found for ${mood}.`)
      }

      return nextSongs
    } catch (err) {
      setSongs([])
      setSelectedSong(null)
      setError(err.response?.data?.message || err.message || 'Failed to fetch songs.')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const handleSelectSong = (song) => {
    setSelectedSong(song)
  }

  return {
    songs,
    selectedSong,
    selectedMood,
    loading,
    error,
    handleGetSongBasedOnMood,
    handleSelectSong
  }
}

export default useSong
