import { HOME_HERO_TRAIL_IMAGES_GREEN } from './homeHeroTrailImagesGreen.js'
import { HOME_HERO_TRAIL_IMAGES_PINK } from './homeHeroTrailImagesPink.js'

export const HOME_HERO_FLAVORS = Object.freeze({
  pink: {
    id: 'pink',
    heroColorVar: 'var(--color-portfolio-pink)',
    trailImages: HOME_HERO_TRAIL_IMAGES_PINK,
  },
  green: {
    id: 'green',
    heroColorVar: 'var(--color-portfolio-lime)',
    trailImages: HOME_HERO_TRAIL_IMAGES_GREEN,
  },
})
