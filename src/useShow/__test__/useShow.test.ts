import { act, renderHook } from '@testing-library/react-hooks/dom'
import { useShow } from '..'

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

    const fn2 = jest.fn()
    const {} = renderHook(() => useShow(fn2))

    const _promise = Promise
    act(() => {
      window.Promise = null as any
    })
    await _promise.resolve().then(() => {})
    expect(fn2).toHaveBeenCalledTimes(1)

    //TODO: emit visibilitychange
  })
})
