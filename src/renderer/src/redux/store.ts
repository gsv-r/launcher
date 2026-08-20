import { configureStore } from '@reduxjs/toolkit'
import launcherReducer from './slices/launcherSlice'

export const store = configureStore({
  reducer: { launcher: launcherReducer },
  devTools: true
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch