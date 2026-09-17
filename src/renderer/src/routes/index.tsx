import { createHashRouter, RouterProvider } from 'react-router-dom'
import Practice from '../screens/practice'

const router = createHashRouter([
  { path: '/', element: <Practice /> },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}