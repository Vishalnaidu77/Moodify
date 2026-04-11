const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const getRedirectUri = () => {
    if (typeof window === 'undefined') {
        return import.meta.env.VITE_SPOTIFY_REDIRECT_URI
    }

    return new URL('/spotify-callback', window.location.origin).toString()
}

const scopes = ['streaming', 'user-read-email', 'user-read-private', 'user-modify-playback-state', 'user-read-playback-state']

export const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = window.crypto.getRandomValues(new Uint8Array(length))

    return values.reduce((acc, x) => acc + possible[x % possible.length], '')
}

const sha256  = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
}

export async function loginWithSpotify() {
    const redirectUri = getRedirectUri()
    const codeVerifier = generateRandomString(64)
    const hashed = await sha256(codeVerifier)
    const codeChallenge = base64encode(hashed)

    localStorage.setItem('spotify_code_verifier', codeVerifier)

    const authUrl = new URL('https://accounts.spotify.com/authorize')
    authUrl.search = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope: scopes.join(' '),
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri
    }).toString()

    window.location.href = authUrl.toString()
}

export async function exchangeCodeForToken(code){
    const redirectUri = getRedirectUri()
    const codeVerifier = localStorage.getItem('spotify_code_verifier')

    const res = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier
        })
    })

    const data = await res.json()

    if(!res.ok){
        throw new Error(data.error_description || 'Failed to exchange code for token')
    }

    localStorage.setItem('spotify_access_token', data.access_token)

    if (data.refresh_token) {
        localStorage.setItem('spotify_refresh_token', data.refresh_token)
    }

    return data
}
