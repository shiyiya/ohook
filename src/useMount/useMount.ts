import { useEffectOnce } from '../useEffectOnce/useEffectOnce'

export const useMount = (fn: () => void) => {
  useEffectOnce(fn)
}
