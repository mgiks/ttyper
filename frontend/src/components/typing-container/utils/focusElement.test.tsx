import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { focusElement } from './focusElement'

describe('focusElement', () => {
  it('focus', async () => {
    render(<textarea data-testid='elementToFocus' />)
    const elementToFocus = await screen.findByTestId(/elementToFocus/)
    focusElement(elementToFocus)
    expect(elementToFocus).toHaveFocus()
  })
})
