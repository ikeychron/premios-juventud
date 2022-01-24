import { createStore, applyMiddleware } from "redux"
import { createWrapper } from "next-redux-wrapper"
import { composeWithDevTools } from "redux-devtools-extension"
import thunkMiddleware from "redux-thunk"

import reducers from "./reducers"

let store // eslint-disable-line

const makeStore = (initialState) => {
  store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
  return store
}

export { store }

export default createWrapper(makeStore)
