import { SET_ROUTE_TYPE } from "./constants"
import setToState from "src/utils/setToState"

const initialState = {
  type: "public",
}

const routesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ROUTE_TYPE:
      return setToState(state, {
        type: payload,
      })

    default:
      return state
  }
}

export default routesReducer
