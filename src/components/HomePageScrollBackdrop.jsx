import { useEffect, useState } from 'react'

/**
 * Capa fija bajo el contenido del home: rosa al inicio → portfolio-bg al hacer scroll.
 * Las secciones del home van con fondo transparente para que se vea esta transición.
 */
export function HomePageScrollBackdrop() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
