import { SET_ROUTE_TYPE } from "./constants"
import createAction from "src/utils/createAction"

// Create Actions
const setRouteTypeAction = createAction(SET_ROUTE_TYPE)

// Actions
export const setRouteType = (type) => setRouteTypeAction(type)
