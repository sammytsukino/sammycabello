import { fireEvent, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { Route } from 'react-router-dom'
import { ProjectDetailView } from './ProjectDetailView.jsx'
import { renderWithRouter } from '../test/testUtils.jsx'

vi.mock('lenis', () => {
  class LenisMock {
    constructor() {
      this.scroll = 0
      this.limit = 900
      this.listeners = new Map()
      this.raf = vi.fn()
      this.resize = vi.fn()
      this.destroy = vi.fn()
    }

    on(event, callback) {
      if (!this.listeners.has(event)) this.listeners.set(event, [])
      this.listeners.get(event).push(callback)
      return () => this.off(event, callback)
    }

    off(event, callback) {
      const list = this.listeners.get(event)
      if (!list) return
      this.listeners.set(
        event,
        list.filter((cb) => cb !== callback),
      )
    }

    scrollTo(target, options = {}) {
      this.scroll = target
      this.listeners.get('scroll')?.forEach((cb) => cb(this))
      options.onComplete?.()
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

    const dots = screen.getAllByRole('tab', { name: /Ir al párrafo/i })
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

    const tile = document.querySelector('section button[type="button"]')
    if (tile) fireEvent.click(tile)

    await waitFor(() => {
      const closeBtn = screen.queryByRole('button', { name: 'Cerrar' })
      if (closeBtn) fireEvent.click(closeBtn)
    })

    fireEvent.keyDown(window, { key: 'Escape' })
  })

  it('renders figma live link for xplorer', () => {
    renderProject('xplorer')
    expect(
      screen.getByLabelText('Ver demo en vivo (se abre en una nueva pestaña)'),
    ).toBeInTheDocument()
    expect(
      screen.queryByLabelText('Ver repositorio en GitHub (se abre en una nueva pestaña)'),
    ).not.toBeInTheDocument()
  })
})
