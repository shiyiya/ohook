<h1 align='center'>WIP···</h1>

<p align='center'>:smiling_face_with_three_hearts: Another React Hook Library</p>

<div align="center">

[![Build Status](https://img.shields.io/github/workflow/status/shiyiya/ohook/main.svg)](https://github.com/shiyiya/ohook/actions)
[![Coverage Status](https://coveralls.io/repos/github/shiyiya/ohook/badge.svg?branch=main)](https://coveralls.io/github/shiyiya/ohook?branch=main)
[![NPM Version](https://img.shields.io/npm/v/ohook.svg)](https://npmjs.com/package/ohook)
[![NPM Download](https://img.shields.io/npm/dt/ohook.svg)](https://npmjs.com/package/ohook)

</div>

## List Of Hooks

- [x] [useClassicalState](#useClassicalState)
- [x] [useToggle](#useToggle)

- [x] [useMount](#useMount)
- [x] [useShow](#useShow)
- [x] [useUnmount](#useUnmount)
- [x] [useUpdate](#useUpdate)

- [x] [useTimeoutFn](#useTimeoutFn)
- [x] [useDebounceFn](#useDebounceFn)
- [x] [useThrottleFn](#useThrottleFn)
- [x] [useOnOutsideClick](#useOnOutsideClick)
- [] ...

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

### useMount

Run effect only when component is first mounted.

```ts
useMount(() => {
  // code ...
  return () => {
    // unmount
  }
})
```

### useShow

Run effect when component is visible after `usemount` and document visibilitychanged.

```ts
useShow(() => {
  // Run when visible

  return () => {
    // Run when not visible
  }
})
```

### useUnmount

Run effect only when component is unmounted.

```ts
useUnmount(() => {
  // code
})
```

### useUpdateEffect

Effect hook that ignores the first render (not invoked on mount)

```ts
function useUpdateEffect(effect: React.EffectCallback, deps?: React.DependencyList): void

const state = useState(1)

useUpdateEffect(() => {
  // code
}, [state])
```

### useTimeoutFn

handle the setTimeout timer function. Can be called repeatedly.

Returns:

- (Function): Returns the new timeout function.

```ts
useTimeout(fn: () => void, delay: number | undefined ,autoRun: boolean);

const fn = useTimeoutFn(() => {}, 1000, true) // auto run after 1s
const fn2 = useTimeoutFn(() => {}, 1000, false) // run effect when u call it

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
