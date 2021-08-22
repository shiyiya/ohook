import useTimeout from '../useTimeout'

export const useInterval = (fn: Function, delay?: number, immediate: boolean = true) => {
  const timeout = useTimeout(
    () => {
      fn()
      timeout.run()
    },
    delay,
    immediate
  )

  return timeout
}

export default useInterval
