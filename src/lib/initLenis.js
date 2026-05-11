import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null
let tickerFn = null

/**
 * Smooth scroll global (Lenis) + sincronía con GSAP ScrollTrigger.
 * No se inicializa si el usuario tiene prefers-reduced-motion: reduce.
 */
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
