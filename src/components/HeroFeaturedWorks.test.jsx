import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HeroFeaturedWorks } from './HeroFeaturedWorks.jsx'

describe('HeroFeaturedWorks', () => {
  it('renders three featured work placeholders', () => {
    render(<HeroFeaturedWorks />)

    expect(screen.getByRole('group', { name: 'Selección de trabajos' })).toBeInTheDocument()
    expect(screen.getAllByText(/Proyecto destacado/i)).toHaveLength(3)
  })
})
