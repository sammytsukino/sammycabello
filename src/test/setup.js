import '@testing-library/jest-dom/vitest'

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback
  }
  observe() {
    this.callback([{ isIntersecting: false }])
  }
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock
global.IntersectionObserver = IntersectionObserverMock
window.scrollTo = vi.fn()

vi.stubGlobal(
  'requestAnimationFrame',
  vi.fn((cb) => {
    const id = setTimeout(() => cb(performance.now()), 0)
    return id
  }),
)
vi.stubGlobal('cancelAnimationFrame', vi.fn((id) => clearTimeout(id)))

function createMatchMedia(matches = false) {
  return (query) => ({
    matches: query.includes('prefers-reduced-motion') ? matches : false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: vi.fn(createMatchMedia()),
})
