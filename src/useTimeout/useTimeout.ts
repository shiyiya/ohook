import { useCallback, useRef } from 'react'
import { useMount } from '../useMount/useMount'

export const useTimeout = (
  fn: Function,
  delay?: number,
  immediate: boolean = true
): { run: VoidFunction; cancel: VoidFunction } => {
  const cb = useRef(fn)
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  cb.current = fn

  const run = useCallback(
    (...arg) => {
      if (timeout.current) clearTimeout(timeout.current)

      timeout.current = setTimeout(() => {
        cb.current(...arg)
      }, delay)
    },
    [delay]
  )

  const cancel = useCallback(() => {
    if (timeout.current) clearTimeout(timeout.current)
  }, [])

  useMount(() => {
    if (immediate) run()
    return cancel
  })

  return { run, cancel }
}

export default useTimeout
