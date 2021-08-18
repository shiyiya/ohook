import { EffectCallback, useRef } from 'react'
import { useMount } from '..'
import { isFunction } from '../utils/isFunction'
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
        if (effectReturn.current && isFunction(effectReturn.current)) effectReturn.current()
      }
    }

    document.addEventListener('visibilitychange', visibilitychangeHandler, { passive: true })

    return () => {
      document.removeEventListener('visibilitychange', visibilitychangeHandler)
    }
  })
}

export default useShow
