import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null
let tickerFn = null

export function getLenis() {
  return lenisInstance
}

const NAV_SCROLL_DURATION_MIN_S = 2.4
const NAV_SCROLL_DURATION_MAX_S = 6.75
const NAV_SCROLL_MS_PER_PX = 1.55
const NAV_SCROLL_SHORT_DISTANCE_PX = 1100
const NAV_SCROLL_MS_PER_PX_LONG = 2.4

function lenisNavEasing(t) {
  return 1 - (1 - t) ** 3
}

function getNavScrollDurationS(distancePx) {
  const distance = Math.abs(distancePx)
  let scaled

  if (distance <= NAV_SCROLL_SHORT_DISTANCE_PX) {
    scaled = distance * (NAV_SCROLL_MS_PER_PX / 1000)
  } else {
    const shortLeg =
      NAV_SCROLL_SHORT_DISTANCE_PX * (NAV_SCROLL_MS_PER_PX / 1000)
    const longLeg =
      (distance - NAV_SCROLL_SHORT_DISTANCE_PX) *
      (NAV_SCROLL_MS_PER_PX_LONG / 1000)
    scaled = shortLeg + longLeg
  }

  return Math.min(
    NAV_SCROLL_DURATION_MAX_S,
    Math.max(NAV_SCROLL_DURATION_MIN_S, scaled),
  )
}

function getNavScrollOptions(distancePx) {
  return {
    duration: getNavScrollDurationS(distancePx),
    easing: lenisNavEasing,
    lock: true,
  }
}

function getScrollDistanceToElement(el) {
  if (!lenisInstance || !el) return 0
  const rect = el.getBoundingClientRect()
  const targetScroll = Math.round(rect.top + lenisInstance.animatedScroll)
  const limit = lenisInstance.limit ?? targetScroll
  const clamped = Math.max(0, Math.min(targetScroll, limit))
  return Math.abs(clamped - lenisInstance.animatedScroll)
}


export const NAV_GESTURE_CLICK_DELAY_MS = 300

function runNavGesture(action, { delayMs = 0 } = {}) {
  if (delayMs <= 0) {
    action()
    return
  }
  window.setTimeout(action, delayMs)
}

function scrollElementIntoView(el) {
  if (!el) return

  if (lenisInstance) {
    const distance = getScrollDistanceToElement(el)
    lenisInstance.scrollTo(el, getNavScrollOptions(distance))
    return
  }

  const instant =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({
    behavior: instant ? 'instant' : 'smooth',
    block: 'start',
  })
}

export function scrollToPageTop({ delayMs = 0 } = {}) {
  runNavGesture(() => {
    if (lenisInstance) {
      const distance = lenisInstance.animatedScroll
      lenisInstance.scrollTo(0, getNavScrollOptions(distance))
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, { delayMs })
}

export function scrollToPageSectionById(id, { delayMs = 0 } = {}) {
  if (typeof document === 'undefined') return

  runNavGesture(() => {
    const el = document.getElementById(id)
    scrollElementIntoView(el)
  }, { delayMs })
}

export function initLenis() {
  if (typeof window === 'undefined' || lenisInstance) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  lenisInstance = new Lenis({
    anchors: true,
    stopInertiaOnNavigate: true,
    lerp: 0.08,
    wheelMultiplier: 0.85,
    touchMultiplier: 0.9,
  })

  lenisInstance.on('scroll', ScrollTrigger.update)

  tickerFn = (time) => {
    lenisInstance?.raf(time * 1000)
  }
  gsap.ticker.add(tickerFn)
  gsap.ticker.lagSmoothing(0)

  if (import.meta.hot) {
    import.meta.hot.dispose(() => {
      if (tickerFn) {
        gsap.ticker.remove(tickerFn)
        tickerFn = null
      }
      lenisInstance?.destroy()
      lenisInstance = null
    })
  }
}
