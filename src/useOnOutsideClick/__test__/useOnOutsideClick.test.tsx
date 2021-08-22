import React from 'react'
import { render, fireEvent, cleanup, screen } from '@testing-library/react'
import { useOnOutsideClick } from '../..'
import userEvent from '@testing-library/user-event'
import { useMount } from '../../useMount'

afterEach(cleanup)

const DEFAULT_TITLE = `default`
const OUTSIDE_TITLE = `outside`

const App = ({ withKeyBoard = false }) => {
  const elRef = useOnOutsideClick<HTMLDivElement>(
    () => {
      document.title = OUTSIDE_TITLE
    },
    true,
    withKeyBoard
  )

  useMount(() => {
    document.title = DEFAULT_TITLE
  })

  return (
    <>
      <div ref={elRef}>React target</div>
      <div>React outSide</div>
    </>
  )
}

test('useOnOutsideClick: click outside', async () => {
  render(<App />)

  const target = screen.getByText('React target')
  const outside = screen.getByText('React outSide')

  fireEvent.mouseDown(target)
  fireEvent.mouseUp(target)
  expect(document.title).toEqual(DEFAULT_TITLE)

  fireEvent.mouseDown(outside)
  fireEvent.mouseUp(target)
  expect(document.title).toEqual(DEFAULT_TITLE)

  fireEvent.mouseDown(target)
  fireEvent.mouseUp(outside)
  expect(document.title).toEqual(DEFAULT_TITLE)

  fireEvent.mouseDown(outside)
  fireEvent.mouseUp(outside)
  expect(document.title).toEqual(OUTSIDE_TITLE)
})

test('useOnOutsideClick: click outside with Esc', async () => {
  render(<App withKeyBoard={true} />)

  userEvent.keyboard('{Escape}')
  expect(document.title).toEqual(OUTSIDE_TITLE)
})
