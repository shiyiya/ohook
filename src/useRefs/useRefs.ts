import { useState, useCallback } from 'react'

//TODO: type
export const useRefs = (initialValue = {}) => {
  const [refs, _] = useState<any>(initialValue)
  return [
    refs,
    useCallback(
      (name: string) => {
        if (!refs[name]) refs[name] = { current: null }
        return refs[name]
      },
      [refs]
    )
  ] as const
}

export default useRefs
