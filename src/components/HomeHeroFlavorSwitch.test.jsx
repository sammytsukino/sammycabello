import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { HomeHeroFlavorSwitch } from './HomeHeroFlavorSwitch.jsx'
import { renderWithProviders } from '../test/testUtils.jsx'

describe('HomeHeroFlavorSwitch', () => {
  it('toggles flavor label and aria-label', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1)

    renderWithProviders(<HomeHeroFlavorSwitch />)

    expect(screen.getByRole('button', { name: /verde/i })).toHaveTextContent(
      'FEELING HEALTHY?',
    )

    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('button', { name: /rosa/i })).toHaveTextContent(
      'CRAVING SWEETS?',
    )
  })
})
