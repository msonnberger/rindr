import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Button from '../src/components/Button.tsx'

it('Test if Button is rendered', () => {
  render(<Button buttonType="button" text="Done" bgColor="bg-rose-700"></Button>)

  expect(screen.getByText(/done/i)).toBeInTheDocument()
})

it('if button clicked, onClick is called', () => {
  const onClick = jest.fn()

  render(<Button buttonType="button" text="Done" bgColor="bg-rose-700" onClick={onClick}></Button>)
  fireEvent.click(screen.getByText(/Done/i))

  expect(onClick).toHaveBeenCalledTimes(1)
})
