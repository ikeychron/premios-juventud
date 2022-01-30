import { combineReducers } from "redux"

import layoutReducer from "./modules/layout/reducer"
import genericsReducer from "./modules/generics/reducer"

const rootReducer = combineReducers({
  layout: layoutReducer,
  generics: genericsReducer,
})

export default rootReducer
