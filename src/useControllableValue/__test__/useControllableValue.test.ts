import { act, renderHook } from '@testing-library/react-hooks/dom'
import { useControllableValue } from '../..'

describe('useControllableValue', () => {
  it('should be defined', () => {
    expect(useControllableValue).toBeDefined()
  })

  it('should render', () => {
    const { result } = renderHook(() => useControllableValue())
    expect(result.error).toBeUndefined()
    expect(
      renderHook(() => useControllableValue({ defaultValue: 'hello', value: 'hello', onChange: () => {} })).result.error
    ).toBeUndefined()
  })

  it('should have defalut value', () => {
    const { result } = renderHook(() => useControllableValue({ defaultValue: 'hello' }))
    expect(result.current[0]).toBe('hello')

    const { result: r1 } = renderHook(() => useControllableValue({ defaultValue: 'hello', value: 'hi' }))
    expect(r1.current[0]).toBe('hi')

    const { result: r2 } = renderHook(() => useControllableValue())
    expect(r2.current[0]).toBe(null)
  })

  it('should support callback', () => {
    const cb = jest.fn()
    const { result, rerender } = renderHook(() => useControllableValue({ value: 'hi', onChange: cb }))

    act(() => {
      result.current[1]('ohook')
    })
    expect(cb).toHaveBeenCalledWith('ohook')
    rerender()
    expect(cb).toHaveBeenCalledTimes(1)

    const cb1 = jest.fn()
    const { result: r1 } = renderHook(() => useControllableValue({ value: 'hi', defaultValue: 'hello', onChange: cb1 }))
    act(() => {
      r1.current[1]('ohook')
    })
    expect(cb1).toHaveBeenCalledWith('ohook')
    rerender()
    expect(cb1).toHaveBeenCalledTimes(1)

    const { result: r2 } = renderHook(() => useControllableValue())
    expect(r2.current[0]).toBe(null)
    act(() => {
      r2.current[1]('ohook')
    })
    expect(r2.current[0]).toBe('ohook')
  })
})
