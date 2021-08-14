import { renderHook } from '@testing-library/react-hooks/dom'
import { useThrottleFn } from '../..'

describe('useThrottleFn', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it('should be defined', () => {
    expect(useThrottleFn).toBeDefined()
  })

  it('should render', () => {
    const { result } = renderHook(() => {
      useThrottleFn(() => {}, 200)
    })
    expect(result.error).toBeUndefined()
  })

  it('should return new callback if delay is changed', () => {
    const { result, rerender } = renderHook(({ delay }) => useThrottleFn(() => {}, delay), {
      initialProps: { delay: 200 }
    })

    const cb1 = result.current
    rerender({ delay: 123 })

    expect(cb1).not.toBe(result.current)
  })

  it('should invoke given callback immediately', () => {
    const cb = jest.fn()
    const { result } = renderHook(() => useThrottleFn(cb, 200))

    result.current()
    expect(cb).toHaveBeenCalledTimes(1)
  })

  it('should pass parameters to callback', () => {
    const cb = jest.fn((_a: number, _c: string) => {})
    const { result } = renderHook(() => useThrottleFn(cb, 200))

    result.current(1, 'abc')
    expect(cb).toHaveBeenCalledWith(1, 'abc')
  })

  it('should ignore consequential calls occurred within delay, but execute last call after delay is passed', () => {
    const cb = jest.fn()
    const { result } = renderHook(() => useThrottleFn(cb, 200))

    result.current()
    result.current()
    result.current()
    result.current()
    expect(cb).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(199)
    result.current()
    expect(cb).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(1)
    expect(cb).toHaveBeenCalledTimes(2)
    result.current()
    expect(cb).toHaveBeenCalledTimes(2)
    jest.advanceTimersByTime(200)
    expect(cb).toHaveBeenCalledTimes(3)
  })

  it('should drop trailing execution if `trailing is set to false`', () => {
    const cb = jest.fn()
    const { result } = renderHook(() => useThrottleFn(cb, 200, { trailing: false }))

    result.current()
    result.current()
    result.current()
    result.current()
    expect(cb).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(199)
    result.current()
    expect(cb).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(1)
    expect(cb).toHaveBeenCalledTimes(1)
    result.current()
    result.current()
    result.current()
    expect(cb).toHaveBeenCalledTimes(2)
    jest.advanceTimersByTime(200)
    expect(cb).toHaveBeenCalledTimes(2)
  })
})
