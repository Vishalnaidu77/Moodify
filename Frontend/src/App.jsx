import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Home from './pages/Home'
import Register from './features/auth/pages/Register'
import './features/shared/styles/global.scss'
import AuthContext from './features/auth/AuthContext'
import Protected from './features/auth/component/Protected'

const App = () => {

  const router = createBrowserRouter([
      {
        path: '/',
        element: <Protected><Home /></Protected>
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
  ])

  return (
    <AuthContext>
      <RouterProvider router={router} />
    </AuthContext>
  )
}

export default App
