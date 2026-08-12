import { createHashRouter, RouterProvider } from 'react-router-dom'
import Practice from '../screens/practice'
import Profile from '../screens/profile'

const router = createHashRouter([
  { path: '/', element: <Practice /> },
  { path: '/profile', element: <Profile /> },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}