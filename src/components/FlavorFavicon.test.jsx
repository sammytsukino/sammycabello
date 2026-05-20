import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { FlavorFavicon } from './FlavorFavicon.jsx'
import { renderWithProviders } from '../test/testUtils.jsx'

describe('FlavorFavicon', () => {
  it('sets pink favicon on mount', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1)

    renderWithProviders(<FlavorFavicon />)

    const link = document.querySelector('link[rel="icon"]')
    expect(link).toBeTruthy()
    expect(link.href).toContain('Recurso_22')
  })

  it('creates icon link if missing', () => {
    document.querySelectorAll('link[rel="icon"]').forEach((el) => el.remove())

    renderWithProviders(<FlavorFavicon />)

    const link = document.querySelector('link[rel="icon"]')
    expect(link.type).toBe('image/svg+xml')
    expect(link.href).toBeTruthy()
  })
})
