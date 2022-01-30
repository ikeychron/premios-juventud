import {
  SET_NOMINATEDS,
  SET_WINNERS,
  SET_CATEGORIES,
  SET_VOTES,
} from "./constants"
import createAction from "src/utils/createAction"

// Create Actions
const setNominatedsAction = createAction(SET_NOMINATEDS)
const setWinnersAction = createAction(SET_WINNERS)
const setCategoriesAction = createAction(SET_CATEGORIES)
const setVotesAction = createAction(SET_VOTES)

// Actions
export const setNominateds = () => setNominatedsAction()
export const setWinners = () => setWinnersAction()
export const setCategories = () => setCategoriesAction()
export const setVotes = () => setVotesAction()
