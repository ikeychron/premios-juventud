import { createSlice } from "@reduxjs/toolkit"
const layoutSlice = createSlice({
  name: "posts",
  initialState: {
    openSidebar: false,
  },
  reducers: {
    openSidebar(state) {
      state.openSidebar = true
    },
    closeSidebar(state) {
      state.openSidebar = false
    },
    toggleSidebar(state) {
      state.openSidebar = !state.openSidebar
    },
  },
})

// Extract the action creators object and the reducer
const { actions, reducer } = layoutSlice
// Extract and export each action creator by name
export const { openSidebar, closeSidebar, toggleSidebar } = actions
// Export the reducer, either as a default or named export
export default reducer
