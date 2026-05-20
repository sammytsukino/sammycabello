import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ContactView } from './ContactView.jsx'

describe('ContactView', () => {
  it('renders contact heading', () => {
    render(<ContactView />)
    expect(screen.getByRole('heading', { name: 'Contacto' })).toBeInTheDocument()
  })
})
