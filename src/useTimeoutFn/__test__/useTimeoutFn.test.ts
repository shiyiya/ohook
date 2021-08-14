import { renderHook } from '@testing-library/react-hooks'
import { useTimeoutFn } from '../..'

interface ParamsObj {
  fn: (...arg: any) => any
  delay: number
}

const setUp = ({ fn, delay }: ParamsObj) => renderHook(() => useTimeoutFn(fn, delay))

describe('useTimeoutFn', () => {
  jest.useFakeTimers()
  it('should be defined', () => {
    expect(useTimeoutFn).toBeDefined()
  })

  it('timeout should work', () => {
    const callback = jest.fn()

    setUp({ fn: callback, delay: 20 })

    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(70)
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
