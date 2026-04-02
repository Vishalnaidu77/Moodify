import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import './features/shared/styles/global.scss'
import AuthContext from './features/auth/AuthContext'
import Protected from './features/auth/component/Protected'
import Home from './home/pages/Home'
import SongContext from './home/SongContext'
import SpotifyCallback from './home/pages/SpotifyCallback'

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
      },
      {
        path: 'spotify-callback',
        element: <SpotifyCallback />
      }
  ])

  return (
    <AuthContext>
      <SongContext>
        <RouterProvider router={router} />
      </SongContext>
    </AuthContext>
  )
}

export default App
