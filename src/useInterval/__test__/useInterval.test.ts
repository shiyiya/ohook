import { renderHook } from '@testing-library/react-hooks'
import useInterval from '..'

interface ParamsObj {
  fn: (...arg: any) => any
  delay: number
}

const setUp = ({ fn, delay }: ParamsObj) => renderHook(() => useInterval(fn, delay))

describe('useInterval', () => {
  jest.useFakeTimers()
  it('should be defined', () => {
    expect(useInterval).toBeDefined()
  })

  it('useInterval should work', () => {
    const callback = jest.fn()

    const { result } = setUp({ fn: callback, delay: 20 })

    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(60)
    expect(callback).toHaveBeenCalledTimes(3)

    jest.advanceTimersByTime(19)
    result.current.run() // should be cancel prev timer
    expect(callback).toHaveBeenCalledTimes(3)
    jest.advanceTimersByTime(20)
    expect(callback).toHaveBeenCalledTimes(4)
  })
})
