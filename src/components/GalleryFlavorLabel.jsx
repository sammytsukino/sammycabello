import { useHomeHeroFlavor } from '../context/HomeHeroFlavorContext.jsx'
import {
  heroFlavorColorTransitionClass,
  postHeroIconAccentClass,
} from '../lib/homeHeroFlavor.js'

const TRAILING_ARROW_RE = /^(.*?)\s*([→↴]+)\s*$/u

export function GalleryFlavorLabel({ text }) {
  const { flavor } = useHomeHeroFlavor()
  const accent = `inline ${postHeroIconAccentClass(flavor)} ${heroFlavorColorTransitionClass}`
  const match = text.match(TRAILING_ARROW_RE)

  if (!match) return text

  return (
    <span className="inline">
      {match[1]}
      {'\u00a0'}
      <span className={accent}>{match[2]}</span>
    </span>
  )
}
