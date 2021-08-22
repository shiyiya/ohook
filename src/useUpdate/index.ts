import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

export const useUpdate = (fn: EffectCallback, deps?: DependencyList) => {
  const isFristMount = useRef(true)

  useEffect(() => {
    if (isFristMount.current) {
      isFristMount.current = false
    } else {
      return fn()
    }
  }, deps)
}

export default useUpdate
