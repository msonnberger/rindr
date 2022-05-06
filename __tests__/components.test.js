import '@testing-library/jest-dom'
import { fireEvent, queryByText, render, screen } from '@testing-library/react'
import { createRoot } from 'react-dom/client'
import ConfirmationButton from '../src/components/ConfirmationButton.tsx'
import Error from '../src/components/ErrorMessage.tsx'
import HeaderBubble from '../src/components/HeaderBubble.tsx'
import Head from '../src/components/Heading.tsx'
import Image from '../src/components/Image.tsx'
// import Tag from '../src/components/Tag.tsx'
import ToggleButton from '../src/components/ToggleButton.tsx'
import {
  formatDate,
  formatMinutes,
  formatTime,
  getRandomInt,
  printDate,
  printDatePreview,
} from '../src/utils/functions'

describe('testing Heading Component()', () => {
  it('Test if Heading is rendered', () => {
    render(<Head title="test" color="#f0f9ff" marginTop="10"></Head>)

    expect(screen.getByText(/test/i)).toBeInTheDocument()
  })
})

it('Test if Heading is rendered', () => {
  render(
    <HeaderBubble color="bg-emerald-50" text="Tester" path="/car.svg" alt="car"></HeaderBubble>
  )

  expect(screen.getByText(/Tester/i)).toBeInTheDocument()
})

it('Test if Image is rendered', () => {
  render(<Image src="/car.svg" alt="testi" width="32" height="32"></Image>)

  expect(screen.getByAltText(/testi/i)).toBeInTheDocument()
})

// it('Test if Tag is rendered', () => {
//   render(<Tag key="1" text="testtag" className="pl-4 pr-4 py-2"></Tag>)

//   expect(screen.getByAltText(/testtag/i)).toBeInTheDocument()
// })

it('Test if Toggle is rendered', () => {
  render(<ToggleButton text="testtoggle" bgColor="bg-emerald-100" openend="true"></ToggleButton>)

  expect(screen.getByText(/testtoggle/i)).toBeInTheDocument()
})

test('testing if 25 minutes prints "25"', () => {
  expect(formatMinutes('25')).toBe('25')
})

it('Test if Confirmation Button is rendered', () => {
  render(
    <ConfirmationButton
      text="Confirmation"
      bgColor="bg-emerald-100"
      textColor="text-white"
    ></ConfirmationButton>
  )

  expect(screen.getByText(/Confirmation/i)).toBeInTheDocument()
})

it('Test if Error Message is rendered', () => {
  render(<Error headline="head" text="error" colors="bg-emerald-100"></Error>)

  expect(screen.getByText(/error/i)).toBeInTheDocument()
})
