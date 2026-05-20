import { describe, expect, it } from 'vitest'
import { HOME_GALLERY_ITEMS, paletteToRgbCss } from './homeGalleryItems.js'

describe('homeGalleryItems', () => {
  it('exposes eight portfolio projects with unique slugs', () => {
    expect(HOME_GALLERY_ITEMS).toHaveLength(8)

    const slugs = HOME_GALLERY_ITEMS.map((item) => item.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    expect(slugs).toContain('spora')
    expect(slugs).toContain('choreomania')
  })

  it('each project has gallery media and stack', () => {
    for (const item of HOME_GALLERY_ITEMS) {
      expect(item.src).toMatch(/^https:\/\//)
      expect(item.paragraphs.length).toBeGreaterThan(0)
      expect(item.gallery.length).toBeGreaterThan(0)
      expect(item.stack.length).toBeGreaterThan(0)
    }
  })

  it('paletteToRgbCss converts normalized palette values', () => {
    const css = paletteToRgbCss([
      [1, 0, 0],
      [0, 0.5, 0.25],
    ])
    expect(css).toEqual(['rgb(255 0 0)', 'rgb(0 128 64)'])
  })
})
