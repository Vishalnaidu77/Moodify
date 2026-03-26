import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
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





