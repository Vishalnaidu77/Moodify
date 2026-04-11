import axios from 'axios'
import { getApiBaseUrl } from '../../shared/apiBaseUrl'

const api = axios.create({
    baseURL: getApiBaseUrl('/api/auth'),
    withCredentials: true
})

export async function register(username, email, password) {
    const res = await api.post("/register", {
        username,
        email,
        password
    })

    return res.data
}

export async function login(email, password) {
    const res = await api.post("/login", {
        
        email,
        password
    })

    return res.data
}

export async function getMe() {
    const res = await api.get("/get-me")
    return res.data
}

export async function logout() {
    const res = await api.post("/logout")
}





