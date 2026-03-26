import React, { useContext, useEffect } from 'react'
import { AuthProvider } from '../AuthContext'
import { getMe, login, logout, register } from '../services/auth.api'

const useAuth = () => {

    const { user, setUser, loading, setLoading, error, setError } = useContext(AuthProvider)

    const handleRegister = async (username, email, password) => {
        setLoading(true)

        try {
            const res = await register(username, email, password)
            setUser(res.user)
            setLoading(false)
        } catch (err) {
            console.error("Registration failed:", err.message);
            throw err
        } finally{
            setLoading(false)
        }
    }

    const handleLogin = async (email, password) => {
        setLoading(true)

        try {
            const res = await login(email, password)
            setUser(res.user)
            setLoading(false)
        } catch (err) {
            console.error("Login failed:", err.message);
            throw err
        } finally{
            setLoading(false)
        }
    }

    const handleGetMe = async () => {
        setLoading(true)

        try {
            const res = await getMe()
            setUser(res.user)
            setLoading(false)
        } catch (err) {
            console.error("Get user failed:", err.message);
            throw err
        } finally{
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(false)

        try {
            const res = await logout()
            console.log("User logged out");
            setUser(null)
            setLoading(false)
        } catch (err) {
            console.error("Logout failed", err.message);
            throw err            
        } finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        handleGetMe()
    }, [] )

  return {
    user, setUser, loading, setLoading, error, setError, handleRegister, handleLogin, handleGetMe, handleLogout
  }
}

export default useAuth
