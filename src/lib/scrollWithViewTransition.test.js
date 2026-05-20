import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import {
  scrollToElementWithTransition,
  scrollToIdWithTransition,
} from './scrollWithViewTransition.js'

describe('scrollWithViewTransition', () => {
  let element

  beforeEach(() => {
    element = document.createElement('section')
    element.id = 'target'
    element.scrollIntoView = vi.fn()
    document.body.appendChild(element)
  })

  afterEach(() => {
    document.body.innerHTML = ''
    delete document.startViewTransition
  })

  it('does nothing without element', () => {
    expect(() => scrollToElementWithTransition(null)).not.toThrow()
  })

  it('uses view transition API when available', () => {
    document.startViewTransition = vi.fn((callback) => {
      callback()
      return { finished: Promise.resolve() }
    })

    scrollToElementWithTransition(element)

    expect(document.startViewTransition).toHaveBeenCalled()
    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'instant',
      block: 'start',
    })
  })

  it('falls back to smooth scroll without view transitions', () => {
    scrollToElementWithTransition(element)

    expect(element.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    })
  })

  it('scrollToIdWithTransition resolves element by id', () => {
    scrollToIdWithTransition('target')
    expect(element.scrollIntoView).toHaveBeenCalled()
  })

  it('scrollToIdWithTransition ignores missing ids', () => {
    expect(() => scrollToIdWithTransition('missing')).not.toThrow()
  })
})
