import { describe, expect, it, vi } from 'vitest'
import {
  centerTransform,
  generateTrailImageSize,
  powerOut4,
  shouldAutoAnimateTrail,
} from './imageTrailUtils.js'

describe('imageTrailUtils', () => {
  it('centerTransform prepends centering translate', () => {
    expect(centerTransform(null, 'scale(2)')).toBe('translate(-50%, -50%) scale(2)')
    expect(centerTransform(null, undefined)).toBe('translate(-50%, -50%) ')
  })

  it('generateTrailImageSize returns bounded dimensions on desktop', () => {
    vi.spyOn(Math, 'random').mockReturnValue(1)
    const size = generateTrailImageSize({ compact: false })
    expect(size.maxWidth).toBeGreaterThanOrEqual(228)
    expect(size.maxWidth).toBeLessThanOrEqual(272)
    expect(size.maxHeight).toBe(size.maxWidth)
  })

  it('generateTrailImageSize returns smaller dimensions when compact', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const size = generateTrailImageSize({ compact: true })
    expect(size.maxWidth).toBeGreaterThanOrEqual(76)
    expect(size.maxWidth).toBeLessThanOrEqual(100)
    expect(size.maxHeight).toBe(size.maxWidth)
  })

  it('exports powerOut4 easing', () => {
    expect(typeof powerOut4).toBe('function')
    expect(powerOut4(0.5)).toBeTypeOf('number')
  })

  it('shouldAutoAnimateTrail is false for fine pointer + hover (desktop)', () => {
    vi.stubGlobal('matchMedia', (query) => ({
      matches: query === '(pointer: fine)' || query === '(hover: hover)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
    expect(shouldAutoAnimateTrail()).toBe(false)
    vi.unstubAllGlobals()
  })

  it('shouldAutoAnimateTrail is true when pointer is not fine', () => {
    vi.stubGlobal('matchMedia', (query) => ({
      matches: query === '(pointer: coarse)',
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
    expect(shouldAutoAnimateTrail()).toBe(true)
    vi.unstubAllGlobals()
  })
})
