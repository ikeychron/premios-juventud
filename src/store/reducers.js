import { combineReducers } from "redux"

import layoutReducer from "./modules/layout/reducer"
import routesReducer from "./modules/routes/reducer"

const rootReducer = combineReducers({
  layout: layoutReducer,
  routes: routesReducer,
})

export default rootReducer
