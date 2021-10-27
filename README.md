<h1 align='center'>OHOOK</h1>

<p align='center'>:smiling_face_with_three_hearts: Another React Hook Library</p>

<div align="center">

[![Build Status](https://img.shields.io/github/workflow/status/shiyiya/ohook/main.svg)](https://github.com/shiyiya/ohook/actions)
[![Coverage Status](https://coveralls.io/repos/github/shiyiya/ohook/badge.svg?branch=main)](https://coveralls.io/github/shiyiya/ohook?branch=main)
[![NPM Version](https://img.shields.io/npm/v/ohook.svg)](https://npmjs.com/package/ohook)
[![NPM Download](https://img.shields.io/npm/dt/ohook.svg)](https://npmjs.com/package/ohook)
[![GitHub license](https://img.shields.io/github/license/shiyiya/ohook)](https://github.com/shiyiya/ohook/LICENSE)

</div>

## List Of Hooks

### State

- [x] [useClassicalState](#useClassicalState)
- [x] [useToggle](#useToggle)
- [x] useControllableValue(#useControllableValue)

### LifeCycle

- [x] [useMount](#useMount)
- [x] [useShow](#useShow)
- [x] [useWillUnmount](#useWillUnmount)
- [x] [useDidUpdate](#useDidUpdate)

### SideEffect

- [x] [useTimeout](#useTimeout)
- [x] [useInterval](#useInterval)
- [x] [useDebounceFn](#useDebounceFn)
- [x] [useThrottleFn](#useThrottleFn)

### DOM

- [x] [useOnOutsideClick](#useOnOutsideClick)
- [x] [useEventTarget](#useEventTarget)
- [ ] Waiting for inspiration ···

## Installation

```shell
yarn add ohook
# or
npm i ohook
```

## Usage

[codesandbox example](https://codesandbox.io/s/ohook-online-k8eoc?file=/src/App.tsx)

### useClassicalState

setState like Class Component.

```ts
const [state, setState] = useClassicalState({ isLoading: true, data: [] })

setState({ isLoading: false, data: [1, 2] }) // setState like Class Component
```

### useToggle

Like useState, but can only become true or false.

- initialState <boolean> - initial state or initial state setter as for useState

```ts
const [state, toggle] = useToggle() // detault: false

toggle() // toggle !state
toggle(true) // toggle true
toggle(false) // toggle false
```

### useControllableValue

```ts
interface Options<T> {
  defaultValue?: T | (() => T)
  value?: T | (() => T)
  onChange?: (val: T) => void
}
function useControllableValue<T = any>(props?: Options<T>): readonly [T | null, (v: T) => void]
```

### useMount

Run effect only when component is first mounted.

```ts
useMount(() => {
  // DidMount ...
  return () => {
    // WillUnmount
  }
})
```

### useShow

Run effect when component is visible after `useMount` and document visibilitychanged.

```ts
useShow(() => {
  // Run when visible

  return () => {
    // Run when not visible
  }
})
```

### useWillUnmount

Run effect only when component is unmounted.

```ts
useWillUnmount(() => {
  // code
})
```

### useDidUpdate

Effect hook that ignores the first render (not invoked on mount)

```ts
function useDidUpdate(effect: React.EffectCallback, deps?: React.DependencyList): void

const state = useState(1)

useDidUpdate(() => {
  // code
}, [state])
```

### useTimeout

handle the setTimeout timer function. Can be called repeatedly.

Returns:

- (Function): Returns the new timeout function.

```ts
useTimeout(fn: () => void, delay: number | undefined ,immediate: boolean);

const fn = useTimeout(() => {}, 1000, true) // auto run after 1s
const fn2 = useTimeout(() => {}, 1000, false) // run effect when u call it

fn() // Cancel the previous one and retime it.
fn2() // run after 1s
```

### useInterval

handle the setTimeout timer function, base on `useTimeout`. Can be called repeatedly.

```ts
useInterval(fn: () => void, delay: number | undefined ,immediate: boolean);

const fn = useInterval(() => {}, 1000, true) // auto run after 1s
const fn2 = useInterval(() => {}, 1000, false) // run effect when u call it

fn() // Cancel the previous one and retime it.
fn2() // run after 1s
```

### useDebounceFn

handle the [debounce](https://lodash.com/docs/4.17.15#debounce) function base on `lodash.debounce`.

- options: [loadsh.debounce.options](https://lodash.com/docs/4.17.15#debounce)

Returns:

- (Function): Returns the new debounce function.

```tsx
// Use it like loadsh.debounce
const fn = useDebounceFn(() => {
  fetch('...')
}, 1000)

<input onChange={fn} />
```

### useThrottleFn

handle the [throttle](https://lodash.com/docs/4.17.15#throttle) function base on `lodash.throttle`.

- options: [loadsh.throttle.options](https://lodash.com/docs/4.17.15#throttle)

Returns:

- (Function): Returns the new throttled function.

```tsx
// Use it like loadsh.throttle
const fn = useThrottleFn(() => {
  setState(/* */)
}, 1000)

<div onScroll={fn} />
```

### useOnOutsideClick

Triggers callback when user clicks outside the target element.

- withKeyboard <boolean> - Click the `esc` button to trigger.

Returns:

- `useRef()`.

```tsx
function useOnOutsideClick<T extends HTMLElement>(
  onOutsideClick: (event: MouseEvent | KeyboardEvent) => void,
  isListening: boolean = false,
  withKeyboard?: boolean = false
): React.RefObject<T>

const ref = useOnOutSideClick(() => {}, true)


<div ref={ref} />
```

### useEventTarget

The hook encapsulates onChange and value logic for form controls that obtains value through event.target.value. It also supports custom transformer and reset functionalities.

```tsx
const [value, {  onChange, reset }] = useEventTarget({ initialValue: 'this is initial value' })


<input onChange={fn} />
<button onClick={reset}/>
```
