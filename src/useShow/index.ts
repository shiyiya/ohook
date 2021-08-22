import { EffectCallback, useRef } from 'react'
import { useMount } from '../useMount'
import { nextTick } from '../utils/nextTick'

export const useShow = (fn: EffectCallback) => {
  const effect = useRef(fn)
  const effectReturn = useRef<ReturnType<typeof fn>>()
  effect.current = fn

  useMount(() => {
    nextTick(effect.current)

    const visibilitychangeHandler = () => {
      if (document.hidden) {
        effectReturn.current = effect.current()
      } else {
        effectReturn?.current?.()
      }
    }

    document.addEventListener('visibilitychange', visibilitychangeHandler, { passive: true })

    return () => {
      document.removeEventListener('visibilitychange', visibilitychangeHandler)
    }
  })
}

export default useShow
