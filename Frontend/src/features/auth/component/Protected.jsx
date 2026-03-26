import React from 'react'
import useAuth from '../hook/useAuth'
import { Navigate } from 'react-router-dom'

const Protected = ({ children }) => {

    const { user, loading } = useAuth()

    if(!loading && !user){
        return <Navigate to="/login" />
    }

    if(loading){
        return <h1>Loading</h1>
    }

    return children
}

export default Protected
