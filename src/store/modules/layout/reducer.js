import { OPEN_SIDEBAR, CLOSE_SIDEBAR, TOGGLE_SIDEBAR } from "./constants"
import setToState from "src/utils/setToState"

const initialState = {
  openSidebar: false,
}

const layoutReducer = (state = initialState, { type }) => {
  switch (type) {
    case OPEN_SIDEBAR:
      return setToState(state, {
        openSidebar: true,
      })

    case CLOSE_SIDEBAR:
      return setToState(state, {
        openSidebar: false,
      })

    case TOGGLE_SIDEBAR:
      return setToState(state, {
        openSidebar: !state.openSidebar,
      })

    default:
      return state
  }
}

export default layoutReducer
