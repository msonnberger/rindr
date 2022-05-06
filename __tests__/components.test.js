import '@testing-library/jest-dom'
import { fireEvent, queryByText, render, screen } from '@testing-library/react'
import React from 'react'
import ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client'
import HeaderBubble from '../src/components/HeaderBubble.tsx'
import Head from '../src/components/Heading.tsx'

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
