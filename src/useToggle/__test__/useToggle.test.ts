import { act, renderHook } from '@testing-library/react-hooks/dom'
import { useToggle } from '../..'

describe('useToggle', () => {
  it('should be defined', () => {
    expect(useToggle).toBeDefined()
  })

  it('default value should be false', () => {
    const { result } = renderHook(() => useToggle())

    expect(result.current[0]).toBe(false)
  })

  it('should be support initState', () => {
    const { result } = renderHook(() => useToggle(true))
    const { result: r1 } = renderHook(() => useToggle(() => true))
    const { result: r2 } = renderHook(() => useToggle(() => false))

    expect(result.current[0]).toBe(true)
    expect(r1.current[0]).toBe(true)
    expect(r2.current[0]).toBe(false)
  })

  it('should toogle & toggle without value', () => {
    const { result } = renderHook(() => useToggle())
    act(() => {
      result.current[1]()
    })
    expect(result.current[0]).toBe(true)

    act(() => {
      result.current[1]()
    })
    expect(result.current[0]).toBe(false)

    act(() => {
      result.current[1](true)
    })
    expect(result.current[0]).toBe(true)

    act(() => {
      result.current[1](() => false)
    })
    expect(result.current[0]).toBe(false)
  })
})
