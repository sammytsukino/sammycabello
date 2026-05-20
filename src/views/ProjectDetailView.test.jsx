import { fireEvent, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { Route } from 'react-router-dom'
import { ProjectDetailView } from './ProjectDetailView.jsx'
import { renderWithRouter } from '../test/testUtils.jsx'

vi.mock('lenis', () => {
  class LenisMock {
    constructor() {
      this.raf = vi.fn()
      this.resize = vi.fn()
      this.destroy = vi.fn()
    }
  }
  return { default: LenisMock }
})

vi.mock('tech-stack-icons', () => ({
  default: ({ name }) => <span data-testid="stack-icon">{name}</span>,
}))

describe('ProjectDetailView', () => {
  afterEach(() => {
    document.body.style.overflow = 'auto'
  })

  function renderProject(slug) {
    return renderWithRouter(
      <Route path="/project/:slug" element={<ProjectDetailView />} />,
      { route: `/project/${slug}` },
    )
  }

  it('renders spora project copy and stack icons', () => {
    renderProject('spora')

    expect(screen.getByText(/SPORA is a collaborative/i)).toBeInTheDocument()
    expect(screen.getAllByTestId('stack-icon').length).toBeGreaterThan(0)
    expect(document.querySelector('a[href="/"]')).toBeTruthy()
  })

  it('cycles paragraphs via dots and wheel', () => {
    renderProject('spora')

    const dots = screen.getAllByRole('button', { name: /Ir al párrafo/i })
    fireEvent.click(dots[1])

    const textBlock = document.querySelector('[data-lenis-prevent="true"]')
    fireEvent.wheel(textBlock, { deltaY: 100 })
    fireEvent.wheel(textBlock, { deltaY: -100 })
    fireEvent.wheel(textBlock, { deltaX: 50 })

  })

  it('falls back to first project for unknown slug', () => {
    renderProject('unknown-slug')
    expect(screen.getByText(/SPORA is a collaborative/i)).toBeInTheDocument()
  })

  it('opens and closes lightbox', async () => {
    renderProject('spora')

    const tile = document.querySelector('section .cursor-pointer')
    if (tile) fireEvent.click(tile)

    await waitFor(() => {
      const closeBtn = screen.queryByRole('button', { name: 'Cerrar' })
      if (closeBtn) fireEvent.click(closeBtn)
    })

    fireEvent.keyDown(window, { key: 'Escape' })
  })

  it('renders figma live link for xplorer', () => {
    renderProject('xplorer')
    expect(screen.getByLabelText('Ver Live Preview')).toBeInTheDocument()
    expect(screen.queryByLabelText('Ver en Github')).not.toBeInTheDocument()
  })
})
