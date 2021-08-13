export const nextTick = (handler: VoidFunction) => {
  if (typeof Promise !== undefined) {
    Promise.resolve().then(handler)
  } else {
    setTimeout(handler, 0)
  }
}
