const API_PORT = '3000'

export const getApiBaseUrl = (path = '') => {
    if (typeof window === 'undefined') {
        return `http://localhost:${API_PORT}${path}`
    }

    return `${window.location.protocol}//${window.location.hostname}:${API_PORT}${path}`
}
