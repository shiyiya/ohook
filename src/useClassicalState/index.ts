import { Dispatch, useState, useCallback } from 'react'
import { isFunction } from '../utils/isFunction'

type SetPartialStateAction<S> = Partial<S> | ((prevState: S) => Partial<S>)

export function useClassicalState<S extends Record<string, any>>(
  initialState: S | (() => S) = {} as S
): [S, Dispatch<SetPartialStateAction<S> | void>] {
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
