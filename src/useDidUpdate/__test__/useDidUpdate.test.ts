import { renderHook, act } from '@testing-library/react-hooks/dom'
import { useClassicalState } from '../..'
import { useDidUpdate } from '..'

const useTest = () => {
  const [state, setState] = useClassicalState({
    count: 0,
    unlessCount: 0,
    updatedCount: 0
  })

  useDidUpdate(() => {
    setState((s) => ({ updatedCount: s.updatedCount + 1 }))
  }, [state.count])

  return [state, setState] as const
}

describe('useUpdate Effect', () => {
  const { result } = renderHook(() => useTest())

  act(() => {
    result.current[1]((s) => ({ count: s.count + 1 }))
  })

  act(() => {
    result.current[1]((s) => ({ count: s.count + 1 }))
  })

  act(() => {
    result.current[1]((s) => ({ count: s.count + 1 }))
  })

  act(() => {
    result.current[1]((s) => ({ unlessCount: s.unlessCount + 1 }))
  })

  it('Should be updated together with the dependencies', () => {
    expect(result.current[0].count).toEqual(3)
    expect(result.current[0].updatedCount).toEqual(3)
  })
})
