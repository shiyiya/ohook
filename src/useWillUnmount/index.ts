import { useRef } from 'react'
import { useEffectOnce } from '../useEffectOnce'

export const useWillUnmount = (fn: () => void) => {
  const fnRef = useRef(fn)
  fnRef.current = fn

  useEffectOnce(() => () => fnRef.current())
}

export default useWillUnmount
