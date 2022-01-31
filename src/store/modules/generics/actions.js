import { SET_NOMINATEDS, SET_CATEGORIES } from "./constants"
import createAction from "src/utils/createAction"

// Create Actions
const setNominatedsAction = createAction(SET_NOMINATEDS)
const setCategoriesAction = createAction(SET_CATEGORIES)

// Actions
export const setNominateds = (data) => setNominatedsAction(data)
export const setCategories = (data) => setCategoriesAction(data)
