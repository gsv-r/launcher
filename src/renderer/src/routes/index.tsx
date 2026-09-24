import { createHashRouter, RouterProvider } from 'react-router-dom'
import Practice from '../screens/practice'
import Bikes from '../screens/bikes'
import Tracks from '../screens/tracks'

const router = createHashRouter([
  { path: '/', element: <Practice /> },
  { path: '/bikes', element: <Bikes /> },
  { path: '/tracks', element: <Tracks /> },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}