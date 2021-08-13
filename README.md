<h1 align='center'>WIP···</h1>

<p align='center'>:smiling_face_with_three_hearts: Another React Hook Library</p>

<div align="center">

[![Build Status](https://img.shields.io/github/workflow/status/shiyiya/ohook/main.svg)](https://github.com/shiyiya/ohook/actions)
[![Coverage Status](https://coveralls.io/repos/github/shiyiya/ohook/badge.svg?branch=main)](https://coveralls.io/github/shiyiya/ohook?branch=main)
[![NPM Version](https://img.shields.io/npm/v/ohook.svg)](https://npmjs.com/package/ohook)
[![NPM Download](https://img.shields.io/npm/dt/ohook.svg)](https://npmjs.com/package/ohook)

</div>

## List Of Hooks

- [x] useClassicalState

- [x] useMount
- [x] useShow
- [x] useUnmount
- [x] useUpdateEffect

- [x] useTimeoutFn
- [x] useDebounceFn
- [x] useThrottleFn
- [x] useOnOutsideClick
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

```js
const [state, setState] = useClassicalState({ isLoading: true, data: [] })

setState({ isLoading: false, data: [1, 2] }) // setState like Class Component
```
