import throttle from 'lodash.throttle'
import { useMemo, useRef } from 'react'
import { useWillUnmount } from '../useWillUnmount'
import type { DebouncedFunc } from '../utils/type'

interface ThrottleSettings {
  leading?: boolean | undefined
  trailing?: boolean | undefined
}

export const useThrottleFn = <T extends (...args: any[]) => any>(
  factory: T,
  wait?: number,
  options?: ThrottleSettings
): DebouncedFunc<T> => {
  const factoryRef = useRef(factory)
  factoryRef.current = factory

  const caller = useMemo(() => throttle(((...arg) => factoryRef.current(...arg)) as T, wait, options), [wait])

  useWillUnmount(caller.cancel)

  return caller
}

export default useThrottleFn
