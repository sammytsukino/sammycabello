export function randomHomeHeroFlavor() {
  return Math.random() < 0.5 ? 'pink' : 'green'
}

export const HERO_FLAVOR_TRANSITION_MS = 700

export const heroFlavorTransitionClass =
  `transition-opacity duration-[700ms] ease-[cubic-bezier(0.33,1,0.68,1)] ` +
  `motion-reduce:transition-none`

export const heroFlavorColorTransitionClass =
  `transition-colors duration-[700ms] ease-[cubic-bezier(0.33,1,0.68,1)] ` +
  `motion-reduce:transition-none`

export function postHeroIconAccentClass(flavor) {
  return flavor === 'green' ? 'text-portfolio-pink' : 'text-portfolio-lime'
}

export function flavorLinkHoverClass(flavor) {
  return flavor === 'green' ? 'hover:text-portfolio-pink' : 'hover:text-portfolio-lime'
}
