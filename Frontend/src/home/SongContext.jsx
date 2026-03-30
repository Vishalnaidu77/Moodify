import { useState } from 'react'
import { createContext } from 'react'

export const SongProvider = createContext()

const SongContext = ({ children }) => {
  const [songs, setSongs] = useState([])
  const [selectedSong, setSelectedSong] = useState(null)
  const [selectedMood, setSelectedMood] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  return (
    <SongProvider.Provider
      value={{
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
      }}
    >
      {children}
    </SongProvider.Provider>
  )
}

export default SongContext
