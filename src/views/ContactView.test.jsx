import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { ContactView } from './ContactView.jsx'

describe('ContactView', () => {
  it('renders contact heading and links', () => {
    render(
      <MemoryRouter>
        <ContactView />
      </MemoryRouter>,
    )
    expect(screen.getByRole('heading', { name: 'Contacto' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /sammy\.cabello\.g@gmail\.com/i })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /bloque de contacto en la home/i }),
    ).toBeInTheDocument()
  })
})
