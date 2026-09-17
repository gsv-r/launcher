import { createHashRouter, RouterProvider } from 'react-router-dom'
import Practice from '../screens/practice'
import Bikes from '../screens/bikes'

const router = createHashRouter([
  { path: '/', element: <Practice /> },
  { path: '/bikes', element: <Bikes /> },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}