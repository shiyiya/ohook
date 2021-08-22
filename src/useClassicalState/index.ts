import { useState, useCallback } from 'react'
import { isFunction } from '../utils/isFunction'
import type { DispatchPartialStateAction } from '../utils/type'

export function useClassicalState<S extends Record<string, any>>(
  initialState: S | (() => S) = {} as S
): [S, DispatchPartialStateAction<S>] {
  const [state, _setState] = useState<S>(initialState)

  const setState = useCallback((state) => {
    _setState((prevState) => ({
      ...prevState,
      ...(isFunction(state) ? state(prevState) : state)
    }))
  }, [])

  return [state, setState]
}

export default useClassicalState
