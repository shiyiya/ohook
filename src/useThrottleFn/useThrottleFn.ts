import throttle from 'lodash.throttle'
import { useMemo, useRef } from 'react'
import { useUnmount } from '../useUnmount/useUnmount'

interface ThrottleSettings {
  leading?: boolean | undefined
  trailing?: boolean | undefined
}

export const useThrottleFn = (fn: (...arg: any[]) => void, wait?: number, options?: ThrottleSettings) => {
  const _fn = useRef(fn)
  _fn.current = fn
  const _throttle = useMemo(
    () =>
      throttle(
        (...arg: any[]) => {
          _fn.current(...arg)
        },
        wait,
        options
      ),
    [wait]
  )

  useUnmount(_throttle.cancel)

  return _throttle
}
