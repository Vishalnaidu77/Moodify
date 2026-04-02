import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SpotifyCallback = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')
        const error = params.get('error')

        if(error){
            console.error("Spotify auth error", error);
            navigate('/')
            return
        }

        if(code){
            localStorage.setItem('spotify_auth_code', code)
        }

        navigate('/')
    }, [navigate])

  return <p>Connecting Spotify</p>
}

export default SpotifyCallback
