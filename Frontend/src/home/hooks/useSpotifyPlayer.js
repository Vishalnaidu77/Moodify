import React, { useEffect, useState } from 'react'
import { loadSpotifySdk } from '../services/spotifyPlayer'

const useSpotifyPlayer = () => {

    const [ player, setPlayer ] = useState(null)
    const [ deviceId, setDeviceId ] = useState(null)
    const [ isReady, setIsReady ] = useState(false)
    const [ spotifyError, setSpotifyError ] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('spotify_access_token')

        if(!token){
            return
        }

        let currentPlayer

        loadSpotifySdk()
        .then((Spotify) => {
            currentPlayer = new Spotify.Player({
                name: 'Moodify Web Player',
                getOAuthToken: (cb) => {
                    const latestToken = localStorage.getItem('spotify_access_token')
                    cb(latestToken)
                },
                volume: 0.5
            })

            currentPlayer.addListener('ready', ({ device_id }) => {
                setDeviceId(device_id)
                setIsReady(true)
            })

            currentPlayer.addListener('initialization_error', ({ message}) => {
                setSpotifyError(message)
            })

            currentPlayer.addListener('authentication_error', ({ message }) => {
                setSpotifyError(message)
            })

            currentPlayer.addListener('account_error', ({ message }) => {
                setSpotifyError(message)
            })

            currentPlayer.addListener('playback_error', ({ message }) => {
                setSpotifyError(message)
            })

            currentPlayer.connect()
            setPlayer(currentPlayer)
        })
        .catch((err) => {
            setSpotifyError(err.message)
        })

        return () => {
            if(currentPlayer){
                currentPlayer.disconnect()
            }
        }
    }, [])

  return {
    player,
    deviceId,
    isReady,
    spotifyError
  }
}

export default useSpotifyPlayer
