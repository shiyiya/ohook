import { renderHook } from '@testing-library/react-hooks/dom'
import { useMount } from '../useMount'

describe('useMount', () => {
  it('should execute useMount if mount & only executed once', () => {
    const cb = jest.fn()
    const { rerender } = renderHook(() => useMount(cb))

    expect(cb).toHaveBeenCalled()
    rerender()
    expect(cb).toHaveBeenCalledTimes(1)
    rerender()
    expect(cb).toHaveBeenCalledTimes(1)
  })
})
