import { describe, expect, it } from 'vitest'
import { HOME_HERO_FLAVORS } from './homeHeroFlavors.js'

describe('homeHeroFlavors', () => {
  it('defines pink and green trail configs', () => {
    expect(Object.keys(HOME_HERO_FLAVORS)).toEqual(['pink', 'green'])

    expect(HOME_HERO_FLAVORS.pink.trailImages.length).toBeGreaterThan(0)
    expect(HOME_HERO_FLAVORS.green.trailImages.length).toBeGreaterThan(0)
    expect(HOME_HERO_FLAVORS.pink.heroColorVar).toContain('portfolio-pink')
    expect(HOME_HERO_FLAVORS.green.heroColorVar).toContain('portfolio-lime')
  })
})
