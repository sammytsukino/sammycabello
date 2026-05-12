import { useEffect, useState } from 'react'


const HERO_SCROLL_RATIO = 0.5

const HYSTERESIS_PX = 65

function heroGrayThresholdY() {
  const el = document.getElementById('home-hero')
  if (!el) return 8
  const top = el.getBoundingClientRect().top + window.scrollY
  return top + el.offsetHeight * HERO_SCROLL_RATIO
}


export function HomePageScrollBackdrop() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => {
      const y = window.scrollY
      const t = heroGrayThresholdY()
      setScrolled((prev) => {
        if (y >= t) return true
        if (y <= t - HYSTERESIS_PX) return false
        return prev
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })

    const hero = document.getElementById('home-hero')
    let ro = null
    if (hero && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(update)
      ro.observe(hero)
    }

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      ro?.disconnect()
    }
  }, [])

  return (
    <div
      aria-hidden
      className={
        `pointer-events-none fixed inset-0 z-0 ` +
        `transition-colors [transition-duration:var(--page-background-color-transition-time,0.8s)] ` +
        `ease-[cubic-bezier(0.33,1,0.68,1)] motion-reduce:transition-none ` +
        (scrolled ? 'bg-portfolio-bg' : 'bg-portfolio-pink')
      }
    />
  )
}
