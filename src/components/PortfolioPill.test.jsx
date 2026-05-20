import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PortfolioPill } from './PortfolioPill.jsx'

describe('PortfolioPill', () => {
  it('renders as span by default', () => {
    render(<PortfolioPill>Still cooking</PortfolioPill>)
    const pill = screen.getByText('Still cooking')
    expect(pill.tagName).toBe('SPAN')
    expect(pill.className).toContain('rounded-full')
  })

  it('supports custom element and className', () => {
    render(
      <PortfolioPill as="a" href="/overview/web-stuff" className="extra">
        Web Stuff
      </PortfolioPill>,
    )
    const link = screen.getByRole('link', { name: 'Web Stuff' })
    expect(link).toHaveAttribute('href', '/overview/web-stuff')
    expect(link.className).toContain('extra')
  })
})
