import { cleanup } from '@testing-library/react'
import { useMount, useUpdateEffect, useClassicalState, useUnmount } from '..'
import { act, renderHook } from '@testing-library/react-hooks/dom'
import { useShow } from '../useShow/useShow'

afterEach(cleanup)

const useTest = () => {
  const [state, setState] = useClassicalState({
    count: 0,
    mountCount: 0,
    updateCount: 0,
    isUnmount: false,
    showCount: 0,
    hideCount: 0
  })

  useMount(() => {
    setState((s) => ({ mountCount: s.mountCount + 1 }))
  })

  // TODO:
  useShow(() => {
    setState((s) => ({ showCount: s.showCount + 1 }))

    return () => {
      setState((s) => ({ hideCount: s.hideCount + 1 }))
    }
  })

  useUpdateEffect(() => {
    setState((s) => ({ updateCount: s.updateCount + 1 }))
  }, [state.count])

  useUnmount(() => {
    // ??
  })

  return [state, setState] as const
}

describe('LifeCycel Effect', () => {
  const { result, unmount } = renderHook(useTest)

  act(() => {
    result.current[1]((s) => ({ count: s.count + 1 }))
  })

  act(() => {
    result.current[1]((s) => ({ count: s.count + 1 }))
  })

  act(() => {
    result.current[1]((s) => ({ count: s.count + 1 }))
  })

  unmount() //TODO: test useUnmount

  it('LifeCycel Effect Result', () => {
    expect(result.current[0].mountCount).toEqual(1)
    expect(result.current[0].count).toEqual(3)
    expect(result.current[0].updateCount).toEqual(3)
  })
})
