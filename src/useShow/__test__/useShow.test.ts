import { renderHook } from '@testing-library/react-hooks/dom'
import { useShow } from '../useShow'

describe('useShow', () => {
  it('', () => {
    const fn = jest.fn()
    const { rerender } = renderHook(() => useShow(fn))

    expect(fn).toHaveBeenCalledTimes(1)
    rerender()
    expect(fn).toHaveBeenCalledTimes(1)
    //TODO: emit visibilitychange
  })
})
