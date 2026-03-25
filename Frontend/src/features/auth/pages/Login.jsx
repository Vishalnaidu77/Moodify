import React from 'react'
import '../style/login.scss'
import FormGroup from '../component/FormGroup'

const Login = () => {
  return (
    <main className='login-page'>
        <div className="form-container">
            <form action="">
                <h2>Login</h2>
                <FormGroup label='Email' placeholder='Enter your email' />
                <FormGroup label='Password' placeholder='Enter your password' />
                <button className="button" type='submit'>Login</button>
            </form>
        </div>
    </main>
  )
}

export default Login
