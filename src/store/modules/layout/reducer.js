import { OPEN_SIDEBAR, CLOSE_SIDEBAR, TOGGLE_SIDEBAR } from "./constants"

const initialState = {
  openSidebar: false,
}

const layoutReducer = (state = initialState, { type }) => {
  switch (type) {
    case OPEN_SIDEBAR:
      return {
        openSidebar: true,
      }

    case CLOSE_SIDEBAR:
      return {
        openSidebar: false,
      }

    case TOGGLE_SIDEBAR:
      return {
        openSidebar: !state.openSidebar,
      }

    default:
      return state
  }
}

export default layoutReducer
