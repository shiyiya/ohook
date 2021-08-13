import { act, renderHook } from '@testing-library/react-hooks/dom'
import { useClassicalState } from '../..'

describe('useClassicalState', () => {
  it('should be defined', () => {
    expect(useClassicalState).toBeDefined()
  })

  it('should render', () => {
    const { result } = renderHook(() => useClassicalState())
    const { result: r1 } = renderHook(() => useClassicalState({ count: 0 }))
    expect(result.error).toBeUndefined()
    expect(r1.error).toBeUndefined()
  })

  it('should have defalut value', () => {
    const { result } = renderHook(() => useClassicalState())
    const { result: r1 } = renderHook(() => useClassicalState({ count: 0 }))
    expect(result.current).toBeInstanceOf(Object)
    expect(r1.current[0].count).toEqual(0)
  })

  it('should be support initState', () => {
    const { result } = renderHook(() => useClassicalState({ count: 0 }))
    const { result: r1 } = renderHook(() => useClassicalState<{ count: number }>())

    act(() => {
      r1.current[1]()
      r1.current[1]({ count: 2 })
      result.current[1]((s) => ({ count: s.count + 1 }))
      result.current[1]((s) => ({ count: s.count + 1 }))
    })

    expect(result.current[0].count).toBe(2)
    expect(r1.current[0].count).toBe(2)
  })

  it('should support fn', () => {
    const { result } = renderHook(() => useClassicalState(() => ({ count: 0 })))
    const { result: r2 } = renderHook(() => useClassicalState(() => ({ count: 0 })))

    act(() => {
      result.current[1]({ count: 2 })
      r2.current[1]((s) => ({ count: s.count + 2 }))
    })

    expect(result.current[0].count).toBe(2)
    expect(r2.current[0].count).toBe(2)
  })
})
