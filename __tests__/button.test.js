import { fireEvent, queryByText, render, screen } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import Button from '../src/components/Button.tsx'

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

it('Test if Button is rendered', () => {
  ReactDOM.render(
    <Button buttonType="button" text="Done" bgColor="bg-rose-700"></Button>,
    container
  )

  expect(queryByText(container, 'Done')).toBeTruthy()
})

// it('Test if Button has correct color', () => {
//   ReactDOM.render(
//     <Button buttonType="button" text="Done" bgColor="bg-rose-500"></Button>,
//     container
//   )

//   expect(container).toHaveStyle({ backgroundColor: '#f43f5e' })
// })

it('if button clicked, onClick is called', () => {
  const onClick = jest.fn()

  ReactDOM.render(
    <Button buttonType="button" text="Done" bgColor="bg-rose-700" onClick={onClick}></Button>,
    container
  )
  fireEvent.click(container.querySelector('button'))

  expect(onClick).toHaveBeenCalledTimes(1)
})
