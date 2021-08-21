import { useCallback, useRef, useState } from 'react'
import { isFunction } from '../utils/isFunction'

interface EventTarget<V> {
  target: {
    value: V
  }
}

export interface Options<T, V> {
  initialValue?: T
  formatter?: (value: V) => T
}

export function useEventTarget<S, V = S>({ initialValue, formatter }: Options<S, V> = {}) {
  const [state, setState] = useState(initialValue)
  const fmt = useRef(formatter)
  fmt.current = formatter

  const onChange = useCallback(({ target }: EventTarget<V>) => {
    setState(isFunction(fmt.current) ? fmt?.current?.(target.value) : (target.value as unknown as S))
  }, [])

  const reset = useCallback(() => setState(initialValue), [])

  return [state, { onChange, reset }] as const
}

export default useEventTarget
