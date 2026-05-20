import { describe, expect, it, vi } from 'vitest'
import {
  HERO_FLAVOR_TRANSITION_MS,
  flavorLinkHoverClass,
  heroFlavorColorTransitionClass,
  heroFlavorTransitionClass,
  postHeroIconAccentClass,
  randomHomeHeroFlavor,
} from './homeHeroFlavor.js'

describe('homeHeroFlavor', () => {
  it('randomHomeHeroFlavor returns pink or green', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.1)
    expect(randomHomeHeroFlavor()).toBe('pink')

    vi.spyOn(Math, 'random').mockReturnValue(0.9)
    expect(randomHomeHeroFlavor()).toBe('green')
  })

  it('exports transition constants', () => {
    expect(HERO_FLAVOR_TRANSITION_MS).toBe(700)
    expect(heroFlavorTransitionClass).toContain('transition-opacity')
    expect(heroFlavorColorTransitionClass).toContain('transition-colors')
  })

  it('postHeroIconAccentClass switches by flavor', () => {
    expect(postHeroIconAccentClass('green')).toBe('text-portfolio-pink')
    expect(postHeroIconAccentClass('pink')).toBe('text-portfolio-lime')
  })

  it('flavorLinkHoverClass switches by flavor', () => {
    expect(flavorLinkHoverClass('green')).toBe('hover:text-portfolio-pink')
    expect(flavorLinkHoverClass('pink')).toBe('hover:text-portfolio-lime')
  })
})
