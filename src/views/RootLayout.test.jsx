import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Route } from 'react-router-dom'
import { RootLayout } from './RootLayout.jsx'
import { ContactView } from './ContactView.jsx'
import { renderWithRouter } from '../test/testUtils.jsx'

describe('RootLayout', () => {
  const routes = (
    <Route element={<RootLayout />}>
      <Route path="/contact" element={<ContactView />} />
      <Route path="/project/:slug" element={<main>Project shell</main>} />
      <Route path="/overview/:category" element={<main>Overview shell</main>} />
    </Route>
  )

  it('shows global footer on contact', () => {
    renderWithRouter(routes, { route: '/contact' })
    expect(screen.getByLabelText('Pie de página')).toBeInTheDocument()
  })

  it('hides footer on project and overview routes', () => {
    renderWithRouter(routes, { route: '/project/spora' })
    expect(screen.queryByLabelText('Pie de página')).not.toBeInTheDocument()

    renderWithRouter(routes, { route: '/overview/web-stuff' })
    expect(screen.queryByLabelText('Pie de página')).not.toBeInTheDocument()
  })
})
