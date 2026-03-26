import React, { useState } from 'react'
import '../style/register.scss'
import FormGroup from '../component/FormGroup'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hook/useAuth'

const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { loading, handleRegister } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleRegister(username, email, password)
    navigate("/")

    setUsername("")
    setEmail("")
    setPassword("") 
  }

  return (
    <main className='register-page'>
        <div className="form-container">
          <h2>Register</h2>
            <form action="" onSubmit={handleSubmit}>
              <FormGroup 
                label='Username' 
                placeholder='Enter your username' 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FormGroup 
                label='Email' 
                placeholder='Enter your email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormGroup 
                label='Password' 
                placeholder='Enter your password' 
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="button" type='submit' disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    </main>
  )
}

export default Register
