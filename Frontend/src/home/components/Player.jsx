import useSong from '../hooks/useSong'
import './player.scss'

const Player = () => {
  const { selectedSong, selectedMood, loading } = useSong()
  const hasSong = Boolean(selectedSong)

  return (
    <section className="player-card">
      <div className="player-card__artwork-shell">
        {selectedSong?.posterUrl ? (
          <img
            className="player-card__artwork"
            src={selectedSong.posterUrl}
            alt={selectedSong?.title ? `${selectedSong.title} cover` : 'Song cover'}
          />
        ) : (
          <div className="player-card__artwork player-card__artwork--placeholder">
            {loading ? 'Loading artwork...' : 'No artwork'}
          </div>
        )}
      </div>

      <div className="player-card__content">
        <div className="player-card__header">
          <div>
            <p className="player-card__eyebrow">Moodify match</p>
            <h2>
              {selectedSong?.title || (loading ? 'Finding songs for your mood...' : 'Pick a mood to start')}
            </h2>
            <p className="player-card__meta">
              {loading
                ? 'Building your mood playlist...'
                : selectedSong
                  ? `${selectedSong.artist} - Mood: ${selectedSong.mood || selectedMood || 'Unknown'}`
                  : 'Detect an expression to see song recommendations.'}
            </p>
          </div>
        </div>

        <div className="player-card__details">
          <div className="player-card__pill">
            <span>Selected mood</span>
            <strong>{selectedMood || 'Waiting for detection'}</strong>
          </div>
          <div className="player-card__pill">
            <span>Source</span>
            <strong>Last.fm</strong>
          </div>
        </div>

        <div className="player-card__actions">
          <a
            className={`player-card__link ${!hasSong ? 'player-card__link--disabled' : ''}`}
            href={hasSong ? selectedSong.url : undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={!hasSong}
          >
            {hasSong ? 'Open Track' : 'Track link unavailable'}
          </a>
          <p className="player-card__hint">
            Last.fm gives us track metadata and links, so this card opens the selected song page instead of streaming audio directly.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Player
