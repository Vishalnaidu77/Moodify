import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import Login from './features/auth/pages/Login'
import Home from './pages/Home'
import Register from './features/auth/pages/Register'
import './features/shared/styles/global.scss'

const App = () => {

  const router = createBrowserRouter([
      {
        path: '/',
        element: <Home />
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
    <RouterProvider router={router} />
  )
}

export default App
