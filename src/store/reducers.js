import { combineReducers } from "redux"

import genericsReducer from "./slices/generics"
import layoutReducer from "./slices/layout"

const rootReducer = combineReducers({
  generics: genericsReducer,
  layout: layoutReducer,
})

export default rootReducer
