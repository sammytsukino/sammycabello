import { describe, expect, it, vi } from 'vitest'
import {
  centerTransform,
  generateTrailImageSize,
  powerOut4,
} from './imageTrailUtils.js'

describe('imageTrailUtils', () => {
  it('centerTransform prepends centering translate', () => {
    expect(centerTransform(null, 'scale(2)')).toBe('translate(-50%, -50%) scale(2)')
    expect(centerTransform(null, undefined)).toBe('translate(-50%, -50%) ')
  })

  it('generateTrailImageSize returns bounded dimensions', () => {
    vi.spyOn(Math, 'random').mockReturnValue(1)
    const size = generateTrailImageSize()
    expect(size.maxWidth).toBeGreaterThanOrEqual(228)
    expect(size.maxWidth).toBeLessThanOrEqual(272)
    expect(size.maxHeight).toBe(size.maxWidth)
  })

  it('exports powerOut4 easing', () => {
    expect(typeof powerOut4).toBe('function')
    expect(powerOut4(0.5)).toBeTypeOf('number')
  })
})
