import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { HomeHeroFlavorProvider } from '../context/HomeHeroFlavorContext.jsx'

export function renderWithProviders(ui, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <HomeHeroFlavorProvider>{ui}</HomeHeroFlavorProvider>
    </MemoryRouter>,
  )
}

export function renderWithRouter(routes, { route = '/' } = {}) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <HomeHeroFlavorProvider>
        <Routes>{routes}</Routes>
      </HomeHeroFlavorProvider>
    </MemoryRouter>,
  )
}
