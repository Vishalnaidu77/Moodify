import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../features/auth/hook/useAuth'
import { exchangeCodeForToken } from '../services/spotifyAuth'

const SpotifyCallback = () => {

    const navigate = useNavigate()
    const { handleGetMe } = useAuth()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')
        const error = params.get('error')

        if(error){
            console.error("Spotify auth error", error);
            navigate('/', { replace: true })
            return
        }

        if(!code){
            navigate("/", { replace: true })
            return
        }

        const processedCode = sessionStorage.getItem('spotify_processed_code')

        if(processedCode === code){
            return
        }

        sessionStorage.setItem('spotify_processed_code', code)

        exchangeCodeForToken(code)
        .then(async () => {
            const currentUser = await handleGetMe()

            if (!currentUser) {
                navigate('/login', { replace: true })
                return
            }

            navigate('/', { replace: true })
        })
        .catch((err) => {
            console.error('Token exchange failed: ', err);
            navigate('/', { replace: true })
        })
    }, [handleGetMe, navigate])

  return <p>Connecting Spotify</p>
}

export default SpotifyCallback
