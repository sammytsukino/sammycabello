import { useEffect, useRef } from 'react'
import { useHomeHeroFlavor } from '../context/HomeHeroFlavorContext.jsx'
import {
  heroFlavorTransitionClass,
} from '../lib/homeHeroFlavor.js'
import { getLenis } from '../lib/initLenis.js'

const HERO_SCROLL_RATIO = 0.5
const COLOR_BLEND_RANGE_PX = 250
const PINK_VAR = 'var(--color-portfolio-pink)'
const GREEN_VAR = 'var(--color-portfolio-lime)'

function clamp01(n) {
  return Math.max(0, Math.min(1, n))
}

function measureHeroGrayThreshold() {
  const hero = document.getElementById('home-hero')
  if (!hero) return 8
  return hero.offsetTop + hero.offsetHeight * HERO_SCROLL_RATIO
}

function getScrollY() {
  const lenis = getLenis()
  return lenis ? lenis.scroll : window.scrollY
}

function computeGrayMix(scrollY, threshold) {
  const blendStart = threshold - COLOR_BLEND_RANGE_PX
  return clamp01((scrollY - blendStart) / COLOR_BLEND_RANGE_PX)
}

function mixToBackground(mix, heroColorVar) {
  const heroPct = (1 - mix) * 100
  return `color-mix(in srgb, ${heroColorVar} ${heroPct}%, var(--color-portfolio-bg))`
}

export function HomePageScrollBackdrop() {
  const { flavor } = useHomeHeroFlavor()
  const pinkLayerRef = useRef(null)
  const greenLayerRef = useRef(null)
  const thresholdRef = useRef(0)

  useEffect(() => {
    const refreshThreshold = () => {
      thresholdRef.current = measureHeroGrayThreshold()
    }

    const applyScrollColors = () => {
      const scrollY = getScrollY()
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      const maxScroll = Math.max(1, docHeight - winHeight)
      const scrollFromBottom = Math.max(0, maxScroll - scrollY)

      // 1. Hero blend (0 at top, goes to 1 as we scroll past hero)
      const mix = computeGrayMix(scrollY, thresholdRef.current)

      // 2. Footer blend (starts at 0, goes to 1 at the very bottom, over the exact same range as the top)
      const bottomBlendRange = COLOR_BLEND_RANGE_PX
      let bottomMix = 0
      if (scrollFromBottom < bottomBlendRange) {
        bottomMix = 1 - (scrollFromBottom / bottomBlendRange)
      }

      // 3. Final flavor factor (1 = flavor color, 0 = gray)
      const finalFlavorFactor = Math.max(1 - mix, bottomMix)
      const finalGrayMix = 1 - finalFlavorFactor

      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      const snapped = reducedMotion ? (finalGrayMix >= 0.5 ? 1 : 0) : finalGrayMix

      if (pinkLayerRef.current) {
        pinkLayerRef.current.style.backgroundColor = mixToBackground(
          snapped,
          PINK_VAR,
        )
      }
      if (greenLayerRef.current) {
        greenLayerRef.current.style.backgroundColor = mixToBackground(
          snapped,
          GREEN_VAR,
        )
      }
    }

    refreshThreshold()
    applyScrollColors()

    const onScroll = () => applyScrollColors()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', refreshThreshold, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    const lenis = getLenis()
    lenis?.on('scroll', onScroll)

    const hero = document.getElementById('home-hero')
    let ro = null
    if (hero && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        refreshThreshold()
        onScroll()
      })
      ro.observe(hero)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', refreshThreshold)
      window.removeEventListener('resize', onScroll)
      lenis?.off('scroll', onScroll)
      ro?.disconnect()
    }
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    >
      <div
        ref={pinkLayerRef}
        className={`absolute inset-0 bg-portfolio-pink ${heroFlavorTransitionClass} ${
          flavor === 'pink' ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div
        ref={greenLayerRef}
        className={`absolute inset-0 bg-portfolio-lime ${heroFlavorTransitionClass} ${
          flavor === 'green' ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}
