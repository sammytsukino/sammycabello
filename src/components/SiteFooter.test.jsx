import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import SiteFooter from './SiteFooter.jsx'
import { renderWithProviders } from '../test/testUtils.jsx'

describe('SiteFooter', () => {
  it('renders contact links and sr-only summary', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1)

    renderWithProviders(<SiteFooter />)

    expect(screen.getByLabelText('Pie de página')).toBeInTheDocument()
    expect(screen.getAllByText(/sammy\.cabello\.g@gmail\.com/i).length).toBeGreaterThan(0)
    expect(screen.getByText(/Craving a chat/i)).toBeInTheDocument()
    expect(screen.getByText(/Pie de página:/)).toHaveClass('sr-only')
  })

  it('uses pink icon accent when flavor is green', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9)

    const { container } = renderWithProviders(<SiteFooter />)
    expect(container.querySelector('.text-portfolio-pink')).toBeTruthy()
  })
})
