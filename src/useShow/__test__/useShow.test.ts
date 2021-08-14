import { renderHook } from '@testing-library/react-hooks/dom'
import { useShow } from '../useShow'

describe('useShow', () => {
  it('', async () => {
    const fn = jest.fn()
    const { rerender } = renderHook(() => useShow(fn))

    expect(fn).toHaveBeenCalledTimes(0)
    await Promise.resolve().then(() => {})
    rerender()
    expect(fn).toHaveBeenCalledTimes(1)
    await Promise.resolve().then(() => {})
    rerender()
    expect(fn).toHaveBeenCalledTimes(1)
    //TODO: emit visibilitychange
  })
})
