import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Route } from 'react-router-dom'
import { OverviewView } from './OverviewView.jsx'
import { renderWithRouter } from '../test/testUtils.jsx'

describe('OverviewView', () => {
  function renderOverview(category) {
    return renderWithRouter(
      <Route path="/overview/:category" element={<OverviewView />} />,
      { route: `/overview/${category}` },
    )
  }

  it('renders web stuff grid with project links', () => {
    renderOverview('web-stuff')

    expect(screen.getByText(/WEB STUFF/i)).toBeInTheDocument()
    expect(screen.getByText(/DELICIOUS VISUALS/i)).toBeInTheDocument()
    expect(screen.getAllByRole('link').length).toBeGreaterThan(0)
  })

  it('filters art-design category', () => {
    renderOverview('art-design')
    expect(screen.getByText(/ART & DESIGN/i)).toBeInTheDocument()
  })

  it('filters comms-pr category', () => {
    renderOverview('comms-pr')
    expect(screen.getByText('3.3 COMMUNICATION & PR')).toBeInTheDocument()
  })

  it('falls back to web-stuff for unknown category', () => {
    renderOverview('otro')
    expect(screen.getByText(/WEB STUFF/i)).toBeInTheDocument()
  })
})
