import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { isFunction } from '../utils/isFunction'

export function useToggle(
  initialState: boolean | (() => boolean) = false
): [boolean, Dispatch<SetStateAction<boolean> | void>] {
  const [state, setState] = useState(initialState)

  return [
    state,
    useCallback((nextState) => {
      setState((prevState) => {
        if (typeof nextState === 'undefined') return !prevState

        return isFunction(nextState) ? nextState(prevState) : nextState
      })
    }, [])
  ]
}
