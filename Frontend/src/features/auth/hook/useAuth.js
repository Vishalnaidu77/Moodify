import React, { useContext, useEffect, useEffectEvent } from 'react'
import { AuthProvider } from '../AuthContext'
import { getMe, login, logout, register } from '../services/auth.api'

const PUBLIC_AUTH_ROUTES = ['/login', '/register', '/spotify-callback']

const hasAuthTokenCookie = () => {
    if (typeof document === 'undefined') {
        return false
    }

    return document.cookie
        .split(';')
        .some((cookie) => cookie.trim().startsWith('token='))
}

const useAuth = () => {

    const { user, setUser, loading, setLoading, error, setError } = useContext(AuthProvider)

    const handleRegister = async (username, email, password) => {
        setLoading(true)
        setError(null)

        try {
            const res = await register(username, email, password)
            setUser(res.user)
            return res
        } catch (err) {
            setError(err.response?.data?.message || err.message)
            console.error("Registration failed:", err.message);
            throw err
        } finally {
            setLoading(false)
        }
    }

    const handleLogin = async (email, password) => {
        setLoading(true)
        setError(null)

        try {
            const res = await login(email, password)
            setUser(res.user)
            return res
        } catch (err) {
            setError(err.response?.data?.message || err.message)
            console.error("Login failed:", err.message);
            throw err
        } finally {
            setLoading(false)
        }
    }

    const handleGetMe = async () => {
        setLoading(true)
        setError(null)

        if (!hasAuthTokenCookie()) {
            setUser(null)
            setLoading(false)
            return null
        }

        try {
            const res = await getMe()
            setUser(res.user)
            return res
        } catch (err) {
            if (err.response?.status === 401) {
                setUser(null)
                return null
            }

            setUser(null)
            setError(err.response?.data?.message || err.message)
            console.error("Get user failed:", err.message);
            throw err
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        setError(null)

        try {
            await logout()
            console.log("User logged out");
            setUser(null)
        } catch (err) {
            setError(err.response?.data?.message || err.message)
            console.error("Logout failed", err.message);
            throw err            
        } finally {
            setLoading(false)
        }
    }

    const bootstrapUser = useEffectEvent(async () => {
        const currentPath = window.location.pathname

        if (user) {
            setLoading(false)
            return
        }

        if (PUBLIC_AUTH_ROUTES.includes(currentPath)) {
            setLoading(false)
            return
        }

        if (!hasAuthTokenCookie()) {
            setUser(null)
            setLoading(false)
            return
        }

        try {
            await handleGetMe()
        } catch (err) {
            // `handleGetMe` already updates auth state for bootstrap failures.
        }
    })

    useEffect(() => {
        bootstrapUser()
    }, [])

    return {
        user, setUser, loading, setLoading, error, setError, handleRegister, handleLogin, handleGetMe, handleLogout
    }
}

export default useAuth
