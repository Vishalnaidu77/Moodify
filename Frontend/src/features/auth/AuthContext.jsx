import React, { createContext, useState } from 'react'

export const AuthProvider = createContext()

const AuthContext = ({ children }) => {

    const [ user, setUser ] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(null)

  return (
    <AuthProvider.Provider value={{ user, setUser, loading, setLoading, error, setError }}>
      {children}
    </AuthProvider.Provider>
  )
}

export default AuthContext
