import { renderHook } from '@testing-library/react-hooks'
import { useTimeout } from '../..'

interface ParamsObj {
  fn: (...arg: any) => any
  delay: number
  immediate?: boolean
}

const setUp = ({ fn, delay, immediate = true }: ParamsObj) => renderHook(() => useTimeout(fn, delay, immediate))

describe('useTimeout', () => {
  jest.useFakeTimers()
  it('should be defined', () => {
    expect(useTimeout).toBeDefined()
  })

  it('timeout should work', () => {
    const callback = jest.fn()

    setUp({ fn: callback, delay: 20 })

    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(70)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should be called repeatedly', () => {
    const callback = jest.fn()
    const { result } = setUp({ fn: callback, delay: 20 })

    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(19)
    result.current.run()
    expect(callback).not.toBeCalled() // should be cancel prev timer
    jest.advanceTimersByTime(20)
    expect(callback).toHaveBeenCalledTimes(1)
    result.current.run()
    jest.advanceTimersByTime(20)
    expect(callback).toHaveBeenCalledTimes(2) // should be called repeatedly
  })

  it('should be cancellable', () => {
    const callback = jest.fn()
    const { result } = setUp({ fn: callback, delay: 20 })

    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(19)
    result.current.cancel()
    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(20)
    expect(callback).not.toBeCalled()
  })

  it('should be work with opts', () => {
    const callback = jest.fn()
    const { result } = setUp({ fn: callback, delay: 20, immediate: false })

    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(20)
    expect(callback).not.toBeCalled()
    result.current.run()
    jest.advanceTimersByTime(20)
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
