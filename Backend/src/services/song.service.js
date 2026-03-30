const moodTagMap = {
  happy: 'happy',
  sad: 'sad',
  surprise: 'party',
  surprised: 'party',
  neutral: 'chill',
  blink: 'chill'
}

export async function getSongsByMood(mood) {
  const normalizedMood = mood?.toLowerCase()
  const tag = moodTagMap[normalizedMood]

  if (!process.env.LASTFM_API_KEY) {
    throw new Error('LASTFM_API_KEY is missing')
  }

  if (!tag) {
    throw new Error('Unsupported mood')
  }

  const url = new URL('https://ws.audioscrobbler.com/2.0/')
  url.searchParams.set('method', 'tag.gettoptracks')
  url.searchParams.set('tag', tag)
  url.searchParams.set('api_key', process.env.LASTFM_API_KEY)
  url.searchParams.set('format', 'json')
  url.searchParams.set('limit', '10')

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to fetch songs from Last.fm')
  }

  const data = await response.json()

  return (data.tracks?.track || []).map((track) => ({
    title: track.name,
    artist: track.artist?.name || 'Unknown artist',
    url: track.url,
    posterUrl:
      track.image?.find((image) => image.size === 'extralarge')?.['#text'] ||
      track.image?.find((image) => image.size === 'large')?.['#text'] ||
      '',
    mood: normalizedMood
  }))
}
