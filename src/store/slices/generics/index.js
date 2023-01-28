import { createSlice } from "@reduxjs/toolkit"
import { find } from "lodash"
import { map } from "lodash"

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
      step: 1,
    },
  },
  reducers: {
    setNominateds(state, action) {
      state.nominateds = action.payload
      state.fetchReady = true
    },
    updateNominated(state, action) {
      const newNominateds = filter(
        state.nominateds,
        (n) => n?.id !== action.payload.id
      )
      state.nominateds = [...newNominateds, action.payload]
    },
    resetNominateds(state) {
      state.nominateds = map(state.nominateds, (n) => [
        ...state.nominateds,
        { ...n, votes: 0, winner: false },
      ])
    },
    setCategories(state, action) {
      state.categories = action.payload
    },
    setVotes(state, action) {
      state.votes = action.payload
    },
    deleteVotes(state) {
      state.votes = []
    },
    setFormNameVotes(state, action) {
      state.voteForm.name = action.payload
    },
    setFormVotes(state, action) {
      state.voteForm.votes = action.payload
    },
    setStepVotes(state, action) {
      state.voteForm.step = action.payload
    },
  },
})

// Extract the action creators object and the reducer
const { actions, reducer } = genericsSlice
// Extract and export each action creator by name
export const {
  setNominateds,
  updateNominated,
  resetNominateds,
  setCategories,
  setVotes,
  deleteVotes,
  setFormNameVotes,
  setFormVotes,
  setStepVotes,
} = actions
// Export the reducer, either as a default or named export
export default reducer
