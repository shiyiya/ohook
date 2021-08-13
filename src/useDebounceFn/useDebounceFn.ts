import { useTimeoutFn } from '../useTimeoutFn/useTimeoutFn'

export const useDebounceFn = (fn: Function, ms = 0) => useTimeoutFn(fn, ms, false)
