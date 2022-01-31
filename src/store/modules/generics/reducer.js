import { SET_NOMINATEDS, SET_CATEGORIES } from "./constants"

const initialState = {
  nominateds: [],
  categories: [],
  fetchReady: false,
}

const genericsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_NOMINATEDS:
      return {
        ...state,
        nominateds: payload,
        fetchReady: true,
      }

    case SET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      }

    default:
      return state
  }
}

export default genericsReducer
