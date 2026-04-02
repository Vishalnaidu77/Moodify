import { useEffect } from 'react'
import FaceExpression from '../../features/expression/component/FaceExpression'
import Player from '../components/Player'
import useSong from '../hooks/useSong'
import './home.scss'
import { loginWithSpotify } from '../services/spotifyAuth'

const Home = () => {
  const {
    handleGetSongBasedOnMood,
    handleSelectSong,
    songs,
    selectedSong,
    selectedMood,
    loading,
    error
  } = useSong()


  return (
    <main className="home-layout">
      <button type='button' onClick={loginWithSpotify}>
        Connect spotify
      </button>
      <FaceExpression onClick={handleGetSongBasedOnMood} />

      <section className="home-layout__music">
        <Player />

        <div className="song-results">
          <div className="song-results__header">
            <div>
              <p>Latest mood search</p>
              <h3>{selectedMood || 'No mood selected'}</h3>
            </div>
            <span className="song-results__count">{songs.length} songs</span>
          </div>

          {loading ? (
            <p className="song-results__state">Finding songs that match your expression...</p>
          ) : null}

          {!loading && error ? (
            <p className="song-results__state">{error}</p>
          ) : null}

          {!loading && !error && !songs.length ? (
            <p className="song-results__state">Detect an expression to load a fresh set of song recommendations.</p>
          ) : null}

          <div className="song-results__list">
            {songs.map((song, index) => {
              const isActive =
                selectedSong?.url === song.url &&
                selectedSong?.title === song.title &&
                selectedSong?.artist === song.artist

              return (
                <button
                  key={`${song.title}-${song.artist}-${index}`}
                  type="button"
                  className={`song-results__item ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleSelectSong(song)}
                >
                  {song.posterUrl ? (
                    <img
                      className="song-results__cover"
                      src={song.posterUrl}
                      alt={song.title ? `${song.title} cover` : 'Song artwork'}
                    />
                  ) : (
                    <div className="song-results__cover-placeholder">No art</div>
                  )}

                  <span>
                    <strong className="song-results__title">{song.title}</strong>
                    <span className="song-results__artist">{song.artist}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
