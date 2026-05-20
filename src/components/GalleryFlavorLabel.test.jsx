import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { GalleryFlavorLabel } from './GalleryFlavorLabel.jsx'
import { renderWithProviders } from '../test/testUtils.jsx'

describe('GalleryFlavorLabel', () => {
  it('returns plain text when no trailing arrow', () => {
    renderWithProviders(<GalleryFlavorLabel text="Grab a bite" />)
    expect(screen.getByText('Grab a bite')).toBeInTheDocument()
  })

  it('accentuates trailing arrow glyphs for green flavor', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.9)

    const { container } = renderWithProviders(
      <GalleryFlavorLabel text="See more →" />,
    )

    expect(container.textContent).toContain('See more')
    expect(container.querySelector('.text-portfolio-pink')).toBeTruthy()
  })

  it('accentuates trailing arrow glyphs for pink flavor', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1)

    const { container } = renderWithProviders(
      <GalleryFlavorLabel text="Scroll ↴" />,
    )

    expect(container.querySelector('.text-portfolio-lime')).toBeTruthy()
  })
})
