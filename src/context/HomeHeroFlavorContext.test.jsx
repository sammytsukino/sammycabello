import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import {
  HomeHeroFlavorProvider,
  useHomeHeroFlavor,
} from './HomeHeroFlavorContext.jsx'

function Probe() {
  const { flavor, config, setFlavor } = useHomeHeroFlavor()
  return (
    <div>
      <span data-testid="flavor">{flavor}</span>
      <span data-testid="config-id">{config.id}</span>
      <button type="button" onClick={() => setFlavor('green')}>
        green
      </button>
    </div>
  )
}

describe('HomeHeroFlavorContext', () => {
  it('provides flavor config and updates flavor', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1)

    render(
      <HomeHeroFlavorProvider>
        <Probe />
      </HomeHeroFlavorProvider>,
    )

    expect(screen.getByTestId('flavor')).toHaveTextContent('pink')
    expect(screen.getByTestId('config-id')).toHaveTextContent('pink')

    fireEvent.click(screen.getByRole('button', { name: 'green' }))
    expect(screen.getByTestId('flavor')).toHaveTextContent('green')
  })

  it('throws outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => render(<Probe />)).toThrow(
      'useHomeHeroFlavor must be used within HomeHeroFlavorProvider',
    )

    consoleError.mockRestore()
  })
})
