import debounce from 'lodash.debounce'
import { useRef, useMemo } from 'react'
import { useUnmount } from '../useUnmount'
import type { DebouncedFunc } from '../utils/type'

interface DebounceSettings {
  leading?: boolean | undefined
  trailing?: boolean | undefined
  maxWait?: number | undefined
}

export const useDebounceFn = <T extends (...arg: any[]) => any>(
  factory: T,
  wait?: number,
  options?: DebounceSettings
): DebouncedFunc<T> => {
  const factoryRef = useRef(factory)
  factoryRef.current = factory

  const caller = useMemo(() => debounce(((...arg) => factoryRef.current(...arg)) as T, wait, options), [wait])

  useUnmount(caller.cancel)

  return caller
}

export default useDebounceFn
