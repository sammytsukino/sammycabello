import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { PacManParagraphCounter } from './PacManParagraphCounter.jsx'

describe('PacManParagraphCounter', () => {
  it('shows food ahead at full opacity and eaten food at reduced opacity', () => {
    const { container } = render(
      <PacManParagraphCounter count={4} activeIndex={1} onSelect={vi.fn()} />,
    )

    expect(screen.getAllByRole('tab')).toHaveLength(4)
    const foodImages = container.querySelectorAll('button img[src*="pacman-"]')
    expect(foodImages).toHaveLength(3)
    expect(foodImages[0].className).toContain('opacity-20')
    expect(foodImages[1].className).toContain('opacity-100')
    expect(foodImages[2].className).toContain('opacity-100')
    expect(container.querySelector('img[src*="pacman-5"]')).toBeTruthy()
  })

  it('uses a distinct food icon per slide position', () => {
    const { container } = render(
      <PacManParagraphCounter count={5} activeIndex={0} onSelect={vi.fn()} />,
    )

    const srcs = [...container.querySelectorAll('button img[src*="pacman-"]')].map((img) =>
      img.getAttribute('src'),
    )
    expect(srcs).toHaveLength(4)
    expect(new Set(srcs).size).toBe(4)
  })

  it('calls onSelect when a tab is clicked', () => {
    const onSelect = vi.fn()
    render(
      <PacManParagraphCounter count={3} activeIndex={0} onSelect={onSelect} />,
    )

    fireEvent.click(screen.getByRole('tab', { name: 'Ir al párrafo 3' }))
    expect(onSelect).toHaveBeenCalledWith(2)
  })

  it('moves with arrow keys on the tablist', () => {
    const onSelect = vi.fn()
    render(
      <PacManParagraphCounter count={4} activeIndex={1} onSelect={onSelect} />,
    )

    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowRight' })
    expect(onSelect).toHaveBeenCalledWith(2)

    fireEvent.keyDown(screen.getByRole('tablist'), { key: 'ArrowLeft' })
    expect(onSelect).toHaveBeenCalledWith(0)
  })

  it('advances with the trailing arrow button', () => {
    const onSelect = vi.fn()
    render(
      <PacManParagraphCounter count={3} activeIndex={0} onSelect={onSelect} />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Siguiente párrafo' }))
    expect(onSelect).toHaveBeenCalledWith(1)
  })

  it('returns to the first slide when trailing control shows return at the end', () => {
    const onSelect = vi.fn()
    render(
      <PacManParagraphCounter count={3} activeIndex={2} onSelect={onSelect} />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Volver al primer párrafo' }))
    expect(onSelect).toHaveBeenCalledWith(0)
  })

  it('renders nothing for a single paragraph', () => {
    const { container } = render(
      <PacManParagraphCounter count={1} activeIndex={0} onSelect={vi.fn()} />,
    )
    expect(container).toBeEmptyDOMElement()
  })
})
