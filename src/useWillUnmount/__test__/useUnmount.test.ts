import { renderHook } from '@testing-library/react-hooks/dom'
import { useWillUnmount } from '..'

it('should be executed when the component is unloaded', () => {
  const cb = jest.fn()
  const { unmount } = renderHook(() => useWillUnmount(cb))

  expect(cb).not.toHaveBeenCalled()
  unmount()
  expect(cb).toHaveBeenCalled()
})
