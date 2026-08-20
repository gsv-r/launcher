import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  navbar: {
    active: 'practice'
  }
}

const launcherSlice = createSlice({
  name: 'launcher',
  initialState,
  reducers: {
    resetState: () => initialState,
    setNavbarActive: (state, action) => {
      state.navbar.active = action.payload
    }
  }
})

export const { resetState, setNavbarActive } = launcherSlice.actions
export default launcherSlice.reducer