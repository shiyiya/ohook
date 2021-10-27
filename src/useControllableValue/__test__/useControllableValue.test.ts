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
    expect(result.current[0]).toEqual('hello')
    const { result: r1 } = renderHook(() => useControllableValue({ defaultValue: 'hello', value: 'hi' }))
    expect(r1.current[0]).toEqual('hi')
  })

  it('should support callback', () => {
    const cb = jest.fn((s: string) => {
      rerender({ v: s })
    })
    const { result, rerender } = renderHook(
      ({ v }) => useControllableValue({ defaultValue: 'hello', value: v, onChange: cb }),
      {
        initialProps: { v: 'hi' }
      }
    )

    act(() => {
      result.current[1]('ohook')
    })
    expect(cb).toHaveBeenCalledWith('ohook')
    expect(result.current[0]).toEqual('ohook')
  })
})
