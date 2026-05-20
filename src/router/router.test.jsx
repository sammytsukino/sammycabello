import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Route } from 'react-router-dom'
import Router from './router.jsx'
import { renderWithRouter } from '../test/testUtils.jsx'

vi.mock('../views/HomeView.jsx', () => ({
  HomeView: () => <main data-testid="home-view">Home</main>,
}))

describe('Router', () => {
  it('renders home at /', () => {
    renderWithRouter(
      <Route path="/*" element={<Router />} />,
      { route: '/' },
    )
    expect(screen.getByTestId('home-view')).toBeInTheDocument()
  })

  it('redirects unknown paths to home', () => {
    renderWithRouter(
      <Route path="/*" element={<Router />} />,
      { route: '/no-existe' },
    )
    expect(screen.getByTestId('home-view')).toBeInTheDocument()
  })

  it('renders contact route', () => {
    renderWithRouter(
      <Route path="/*" element={<Router />} />,
      { route: '/contact' },
    )
    expect(screen.getByRole('heading', { name: 'Contacto' })).toBeInTheDocument()
  })

  it('redirects /overview to web-stuff', () => {
    renderWithRouter(
      <Route path="/*" element={<Router />} />,
      { route: '/overview' },
    )
    expect(screen.getByText(/WEB STUFF/i)).toBeInTheDocument()
  })

  it('renders project detail route', () => {
    renderWithRouter(
      <Route path="/*" element={<Router />} />,
      { route: '/project/spora' },
    )
    expect(screen.getByText(/SPORA is a collaborative/i)).toBeInTheDocument()
  })
})
