import { useCallback, useEffect, useRef } from 'react'

export const useTimeoutFn = (fn: Function, ms: number, autoRun = true) => {
  const cb = useRef(fn)
  const timeout = useRef<ReturnType<typeof setTimeout>>()

  const run = useCallback(
    (...arg) => {
      if (timeout.current) clearTimeout(timeout.current)

      timeout.current = setTimeout(() => {
        cb.current(...arg)
      }, ms)
    },
    [ms]
  )

  const cancel = useCallback(() => {
    if (timeout.current) clearTimeout(timeout.current)
  }, [])

  useEffect(() => {
    cb.current = fn
  }, [fn])

  useEffect(() => {
    if (autoRun) run()
    return cancel
  }, [])

  return { run, cancel } as const
}

export default useTimeoutFn
