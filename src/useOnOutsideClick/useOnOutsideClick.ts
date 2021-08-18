import { useEffect, useRef } from 'react'

const options = { passive: true }

export const useOnOutsideClick = <T extends HTMLElement>(
  onOutsideClick: (event: MouseEvent | KeyboardEvent) => void,
  isListening: boolean,
  withKeyboard?: boolean
) => {
  const $targetElment = useRef<T>(null)
  const $mouseDownTargetRef = useRef<HTMLElement>()
  const onOutsideClickRef = useRef(onOutsideClick)
  onOutsideClickRef.current = onOutsideClick

  useEffect(() => {
    if (!$targetElment.current) return
    const handleMouseDown = (event: MouseEvent) => {
      $mouseDownTargetRef.current = event.target as HTMLElement
    }

    const handleMouseUp = (event: MouseEvent) => {
      if (
        event.button === 0 &&
        !$targetElment.current?.contains($mouseDownTargetRef.current as HTMLElement) &&
        !$targetElment.current?.contains(event.target as HTMLElement)
      ) {
        onOutsideClickRef.current(event)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOutsideClickRef.current(event)
    }

    if (isListening) {
      document.addEventListener('mousedown', handleMouseDown, options)
      document.addEventListener('mouseup', handleMouseUp, options)
      if (withKeyboard) document.addEventListener('keydown', handleKeyDown, options)
    }
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isListening])

  return $targetElment
}

export default useOnOutsideClick
