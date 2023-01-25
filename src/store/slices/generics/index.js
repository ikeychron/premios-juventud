import { createSlice } from "@reduxjs/toolkit"
const genericsSlice = createSlice({
  name: "posts",
  initialState: {
    nominateds: [],
    categories: [],
    fetchReady: false,
  },
  reducers: {
    setNominateds(state, action) {
      state.nominateds = action.payload
      state.fetchReady = true
    },
    setCategories(state, action) {
      state.categories = action.payload
    },
  },
})

// Extract the action creators object and the reducer
const { actions, reducer } = genericsSlice
// Extract and export each action creator by name
export const { setNominateds, setCategories } = actions
// Export the reducer, either as a default or named export
export default reducer
