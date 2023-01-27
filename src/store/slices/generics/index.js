import { createSlice } from "@reduxjs/toolkit"
const genericsSlice = createSlice({
  name: "posts",
  initialState: {
    nominateds: [],
    categories: [],
    votes: [],
    fetchReady: false,
    voteForm: {
      name: "",
      votes: [],
    },
  },
  reducers: {
    setNominateds(state, action) {
      state.nominateds = action.payload
      state.fetchReady = true
    },
    setCategories(state, action) {
      state.categories = action.payload
    },
    setVotes(state, action) {
      state.votes = action.payload
    },
    setFormNameVotes(state, action) {
      state.voteForm.name = action.payload
    },
    setFormVotes(state, action) {
      state.voteForm.votes = action.payload
    },
  },
})

// Extract the action creators object and the reducer
const { actions, reducer } = genericsSlice
// Extract and export each action creator by name
export const {
  setNominateds,
  setCategories,
  setVotes,
  setFormNameVotes,
  setFormVotes,
} = actions
// Export the reducer, either as a default or named export
export default reducer
