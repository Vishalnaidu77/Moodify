let spotifySdkPromise = null

export function loadSpotifySdk(){
    if(window.spotify){
        return Promise.resolve(window.Spotify)
    }

    if(spotifySdkPromise){
        return spotifySdkPromise;
    }

    spotifySdkPromise = new Promise((resolve, reject) => {
        const existingScript = document.getElementById('spotify-player-sdk')

        window.onSpotifyWebPlaybackSDKReady = () => {
            resolve(window.Spotify)
        }

        if(existingScript){
            return
        }

        const script = document.createElement('script')
        script.id = 'spotify-player-sdk'
        script.src = 'https://sdk.scdn.co/spotify-player.js'
        script.async = true
        script.onerror = () => reject(new Error('Failed to load spotify SDK'))

        document.body.appendChild(script)
    })

    return spotifySdkPromise
}