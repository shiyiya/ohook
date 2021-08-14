import { renderHook } from '@testing-library/react-hooks/dom'
import { useUnmount } from '../useUnmount'

it('should be executed when the component is unloaded', () => {
  const cb = jest.fn()
  const { unmount } = renderHook(() => useUnmount(cb))

  expect(cb).not.toHaveBeenCalled()
  unmount()
  expect(cb).toHaveBeenCalled()
})
