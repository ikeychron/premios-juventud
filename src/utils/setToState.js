import { cloneDeep, forEach, set } from "lodash"

const setToState = (state, nextValue) => {
  const nextState = cloneDeep(state)
  forEach(nextValue, (value, key) => {
    set(nextState, key, value)
  })
  return nextState
}

export default setToState
