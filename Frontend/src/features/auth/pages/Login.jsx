import React, { useState } from 'react'
import '../style/login.scss'
import FormGroup from '../component/FormGroup'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hook/useAuth'

const Login = () => {

  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")

  const { user, loading, setLoading, handleLogin } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await handleLogin(email, password)
    navigate("/")

    setEmail("")
    setPassword("")
  }

  return (
    <main className='login-page'>
        <div className="form-container">
            <form action="" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <FormGroup label='Email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <FormGroup label='Password' placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className="button" type='submit'>Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    </main>
  )
}

export default Login
