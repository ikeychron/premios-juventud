import { createSlice } from "@reduxjs/toolkit"
import { map } from "lodash"

const genericsSlice = createSlice({
  name: "posts",
  initialState: {
    nominateds: [],
    categories: [],
    votes: [],
    voteForm: {
      name: "",
      questions: {
        churchYouth: "",
        youngChristian: "",
        aspireNewYear: "",
      },
      votes: [],
      step: 1,
    },
    featureFlags: {},
  },
  reducers: {
    setNominateds(state, action) {
      state.nominateds = action.payload
    },
    resetNominateds(state) {
      state.nominateds = map(state.nominateds, (n) => [
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
    setQuestionVotes(state, action) {
      state.voteForm.questions = {
        ...state.voteForm.questions,
        ...action.payload,
      }
    },
    setFeatureFlags(state, action) {
      state.featureFlags = action.payload
    },
  },
})

// Extract the action creators object and the reducer
const { actions, reducer } = genericsSlice
// Extract and export each action creator by name
export const {
  setNominateds,
  resetNominateds,
  setCategories,
  setVotes,
  deleteVotes,
  setFormNameVotes,
  setFormVotes,
  setStepVotes,
  setQuestionVotes,
  setFeatureFlags,
} = actions
// Export the reducer, either as a default or named export
export default reducer
