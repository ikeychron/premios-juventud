// based at https://github.com/reduxjs/react-redux/blob/master/src/hooks/useSelector.ts
import { useReducer, useRef, useMemo, useContext, useDebugValue } from "react"
import { ReactReduxContext } from "react-redux"
import { isEqual } from "lodash"

import { createSubscription } from "src/utils/react-redux/subscription"
import { useIsomorphicLayoutEffect } from "src/utils/react-redux/useIsomorphicLayoutEffect"

function useSelectorWithStoreAndSubscription(
  selector,
  equalityFn,
  store,
  contextSub
) {
  const [, forceRender] = useReducer((s) => s + 1, 0)

  const subscription = useMemo(
    () => createSubscription(store, contextSub),
    [store, contextSub]
  )

  const latestSubscriptionCallbackError = useRef()
  const latestSelector = useRef()
  const latestStoreState = useRef()
  const latestSelectedState = useRef()

  const storeState = store.getState()
  let selectedState

  try {
    if (
      selector !== latestSelector.current ||
      storeState !== latestStoreState.current ||
      latestSubscriptionCallbackError.current
    ) {
      const newSelectedState = selector(storeState)
      // ensure latest selected state is reused so that a custom equality function can result in identical references
      if (
        latestSelectedState.current === undefined ||
        !equalityFn(newSelectedState, latestSelectedState.current)
      ) {
        selectedState = newSelectedState
      } else {
        selectedState = latestSelectedState.current
      }
    } else {
      selectedState = latestSelectedState.current
    }
  } catch (err) {
    if (latestSubscriptionCallbackError.current) {
      err.message += `\nThe error may be correlated with this previous error:\n${latestSubscriptionCallbackError.current.stack}\n\n`
    }

    throw err
  }

  useIsomorphicLayoutEffect(() => {
    latestSelector.current = selector
    latestStoreState.current = storeState
    latestSelectedState.current = selectedState
    latestSubscriptionCallbackError.current = undefined
  })

  useIsomorphicLayoutEffect(() => {
    function checkForUpdates() {
      try {
        const newStoreState = store.getState()
        // Avoid calling selector multiple times if the store's state has not changed
        if (newStoreState === latestStoreState.current) {
          return
        }

        const newSelectedState = latestSelector.current(newStoreState)

        if (equalityFn(newSelectedState, latestSelectedState.current)) {
          return
        }

        latestSelectedState.current = newSelectedState
        latestStoreState.current = newStoreState
      } catch (err) {
        // we ignore all errors here, since when the component
        // is re-rendered, the selectors are called again, and
        // will throw again, if neither props nor store state
        // changed
        latestSubscriptionCallbackError.current = err
      }

      forceRender()
    }

    subscription.onStateChange = checkForUpdates
    subscription.trySubscribe()

    checkForUpdates()

    return () => subscription.tryUnsubscribe()
  }, [store, subscription])

  return selectedState
}

export function createSelectorHook(context = ReactReduxContext) {
  const useReduxContext = () => useContext(context)

  return function useAppSelector(selector, equalityFn = isEqual) {
    if (process.env.NODE_ENV !== "production") {
      if (!selector) {
        throw new Error(`You must pass a selector to useSelector`)
      }
      if (typeof selector !== "function") {
        throw new Error(`You must pass a function as a selector to useSelector`)
      }
      if (typeof equalityFn !== "function") {
        throw new Error(
          `You must pass a function as an equality function to useSelector`
        )
      }
    }
    const { store, subscription: contextSub } = useReduxContext()

    const selectedState = useSelectorWithStoreAndSubscription(
      selector,
      equalityFn,
      store,
      contextSub
    )

    useDebugValue(selectedState)

    return selectedState
  }
}

/**
 * A hook to access the redux store's state. This hook takes a selector function
 * as an argument. The selector is called with the store state.
 *
 * This hook takes an optional equality comparison function as the second parameter
 * that allows you to customize the way the selected state is compared to determine
 * whether the component needs to be re-rendered.
 *
 * @param {Function} selector the selector function
 * @param {Function=} equalityFn the function that will be used to determine equality
 *
 * @returns {any} the selected state
 *
 * @example
 *
 * import React from 'react'
 * import { useSelector } from 'react-redux'
 *
 * export const CounterComponent = () => {
 *   const counter = useAppSelector(state => state.counter)
 *   return <div>{counter}</div>
 * }
 */
const useSelector = /* #__PURE__ */ createSelectorHook()

export default useSelector
