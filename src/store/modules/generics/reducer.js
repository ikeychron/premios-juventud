import {
  SET_NOMINATEDS,
  SET_WINNERS,
  SET_CATEGORIES,
  SET_VOTES,
} from "./constants"

import setToState from "src/utils/setToState"

const initialState = {
  nominateds: [],
  winners: [],
  categories: [],
  votes: [],
  ready: true,
}

const genericsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_NOMINATEDS:
      return setToState(state, {
        nominateds: payload,
      })

    case SET_WINNERS:
      return setToState(state, {
        winners: payload,
      })

    case SET_CATEGORIES:
      return setToState(state, {
        categories: payload,
      })

    case SET_VOTES:
      return setToState(state, {
        votes: payload,
      })

    default:
      return state
  }
}

export default genericsReducer
