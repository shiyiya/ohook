import { useCallback, useState } from 'react'
import useDidUpdate from '../useDidUpdate'

interface Options<T> {
  defaultValue?: T | (() => T)
  value?: T | (() => T)
  onChange?: (val: T) => void
}

export default function useControllableValue<T = any>(props: Options<T> = {}) {
  const { value = null, onChange, defaultValue = null } = props
  const [state, _setState] = useState<T | null>(value ?? defaultValue)

  useDidUpdate(() => {
    if (value) {
      _setState(state)
    }
  }, [value])

  const setState = useCallback(
    (v: T) => {
      if (!value) {
        _setState(v)
      }
      onChange?.(v)
    },
    [onChange, value]
  )

  return [state, setState] as const
}

export { useControllableValue }
