import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null
let tickerFn = null

export function getLenis() {
  return lenisInstance
}

const LENIS_GESTURE_DURATION_S = 1.35
const lenisGestureEase = (t) => Math.min(1, 1.001 - 2 ** (-10 * t))

const lenisGestureOpts = {
  duration: LENIS_GESTURE_DURATION_S,
  easing: lenisGestureEase,
}

export function scrollToPageTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, lenisGestureOpts)
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

export function scrollToPageSectionById(id) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (!el) return

  if (lenisInstance) {
    lenisInstance.scrollTo(el, lenisGestureOpts)
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

export function initLenis() {
  if (typeof window === 'undefined' || lenisInstance) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  lenisInstance = new Lenis({
    anchors: true,
    stopInertiaOnNavigate: true,
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
