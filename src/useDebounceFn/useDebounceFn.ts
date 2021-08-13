import debounce from 'lodash.debounce'
import { useRef, useMemo } from 'react'
import { useUnmount } from '..'

interface DebounceSettings {
  leading?: boolean | undefined
  trailing?: boolean | undefined
}

export const useDebounceFn = (fn: (...arg: any[]) => void, wait?: number, options?: DebounceSettings) => {
  const _fn = useRef(fn)
  _fn.current = fn
  const _debounce = useMemo(
    () =>
      debounce(
        (...arg: any[]) => {
          _fn.current(...arg)
        },
        wait,
        options
      ),
    []
  )

  useUnmount(_debounce.flush)

  return _debounce
}
