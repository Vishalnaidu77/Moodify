const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI

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