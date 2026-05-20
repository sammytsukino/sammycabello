import { useEffect } from 'react'
import { useHomeHeroFlavor } from '../context/HomeHeroFlavorContext.jsx'

const FAVICON_SVG_BY_FLAVOR = Object.freeze({
  pink:
    'https://res.cloudinary.com/dsy30p7gf/image/upload/v1779271643/Recurso_22colored-star_amwutz.svg',
  green:
    'https://res.cloudinary.com/dsy30p7gf/image/upload/v1779271682/Recurso_23colored-star2_tfkjpa.svg',
})

/**
 * Sincroniza el favicon de la pestaña con el modo sweet (pink) / healthy (green).
 */
export function FlavorFavicon() {
  const { flavor } = useHomeHeroFlavor()

  useEffect(() => {
    const href = FAVICON_SVG_BY_FLAVOR[flavor] ?? FAVICON_SVG_BY_FLAVOR.pink
    let link = document.querySelector('link[rel="icon"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.type = 'image/svg+xml'
    link.href = href
  }, [flavor])

  return null
}
