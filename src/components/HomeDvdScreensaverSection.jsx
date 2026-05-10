import { useDvdScreensaver } from '../hooks/useDvdScreensaver.js'
import { forwardRef, useRef, useState, useCallback, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HOME_DVD_SCREENSAVER_IMAGES } from '../data/homeDvdScreensaverImages.js'
import { HOME_DVD_SCREENSAVER_LINKS } from '../data/homeDvdScreensaverLinks.js'
import { scrollToIdWithTransition } from '../lib/scrollWithViewTransition.js'
import NameDisplay from './NameDisplay.jsx'

const SPEEDS_TEXT = [2, 2.35, 2.7]
const SPEEDS_IMAGE = [1.1, 1.45, 1.8, 2.05]
const MAX_VISIBLE_IMAGES = 4

const TEXT_POSITIONS = [
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
]

const IMAGE_POSITIONS = [
  { x: 0.5, y: 0 },
  { x: 0.5, y: 1 },
  { x: 0, y: 0.5 },
  { x: 1, y: 0.5 },
]

const DvdPortfolioLink = forwardRef(function DvdPortfolioLink(
  { item, className, style, children },
  ref,
) {
  const loc = useLocation()
  const navigate = useNavigate()

  if (item.sectionId) {
    return (
      <a
        ref={ref}
        href={`#${item.sectionId}`}
        className={className}
        style={style}
        onClick={(e) => {
          e.preventDefault()
          if (loc.pathname === '/') {
            scrollToIdWithTransition(item.sectionId)
          } else {
            void navigate({
              pathname: '/',
              hash: `#${item.sectionId}`,
            })
          }
        }}
      >
        {children}
      </a>
    )
  }

  return (
    <Link ref={ref} to={item.to} className={className} style={style}>
      {children}
    </Link>
  )
})

function BouncingDvdImage({ currentImgIdx, onImpact, speed, containerRef, initialX, initialY, paused }) {
  const impactRef = useRef(onImpact)
  impactRef.current = onImpact

  const { elementRef } = useDvdScreensaver({
    speed,
    containerRef,
    initialX,
    initialY,
    paused,
    impactCallback: () => impactRef.current(),
  })

  const currentImg = HOME_DVD_SCREENSAVER_IMAGES[currentImgIdx]

  return (
    <div
      ref={elementRef}
      style={{ position: 'absolute', top: 0, left: 0 }}
      className="pointer-events-none z-0 select-none opacity-100"
    >
      <img
        src={currentImg.src}
        alt={currentImg.alt}
        draggable={false}
        className="block h-auto w-[clamp(88px,18vw,400px)] max-w-[400px] object-cover"
      />
    </div>
  )
}

function BouncingScreensaverLink({ item, speed, containerRef, initialX, initialY, paused }) {
  const { elementRef } = useDvdScreensaver({
    speed,
    freezeOnHover: true,
    containerRef,
    initialX,
    initialY,
    paused,
  })

  return (
    <DvdPortfolioLink
      ref={elementRef}
      item={item}
      style={{ position: 'absolute', top: 0, left: 0 }}
      className="z-10 text-inherit no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950/35"
    >
      <NameDisplay
        variant="screensaver"
        text={item.label}
        trigger="hover"
        accent="alternate"
      />
    </DvdPortfolioLink>
  )
}

export function HomeDvdScreensaverSection() {
  const boundsRef = useRef(null)
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const [activeIndices, setActiveIndices] = useState(() =>
    Array.from({ length: Math.min(MAX_VISIBLE_IMAGES, HOME_DVD_SCREENSAVER_IMAGES.length) }).map((_, i) => i)
  )

  const handleImpact = useCallback((slotIndex) => {
    setActiveIndices((prev) => {
      const newIndices = [...prev]
      const currentIdx = newIndices[slotIndex]
      
      let nextIdx = (currentIdx + 1) % HOME_DVD_SCREENSAVER_IMAGES.length
      
      if (HOME_DVD_SCREENSAVER_IMAGES.length > MAX_VISIBLE_IMAGES) {
        let attempts = 0
        while (newIndices.includes(nextIdx) && attempts < HOME_DVD_SCREENSAVER_IMAGES.length) {
          nextIdx = (nextIdx + 1) % HOME_DVD_SCREENSAVER_IMAGES.length
          attempts++
        }
      }

      newIndices[slotIndex] = nextIdx
      return newIndices
    })
  }, [])

  return (
    <section
      id="home-dvd-screensaver"
      ref={sectionRef}
      aria-label="Enlaces del portfolio"
      className="relative isolate h-[100svh] w-full overflow-hidden bg-portfolio-bg"
    >
      <div
        ref={boundsRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      />
      {activeIndices.map((imgIdx, i) => {
        const pos = IMAGE_POSITIONS[i % IMAGE_POSITIONS.length]
        return (
          <BouncingDvdImage
            key={`dvd-img-${i}`}
            currentImgIdx={imgIdx}
            onImpact={() => handleImpact(i)}
            speed={SPEEDS_IMAGE[i] ?? SPEEDS_IMAGE[0]}
            containerRef={boundsRef}
            initialX={pos.x}
            initialY={pos.y}
            paused={!inView}
          />
        )
      })}
      {HOME_DVD_SCREENSAVER_LINKS.map((item, i) => {
        const pos = TEXT_POSITIONS[i % TEXT_POSITIONS.length]
        return (
          <BouncingScreensaverLink
            key={item.sectionId ?? item.to}
            item={item}
            speed={SPEEDS_TEXT[i] ?? SPEEDS_TEXT[0]}
            containerRef={boundsRef}
            initialX={pos.x}
            initialY={pos.y}
            paused={!inView}
          />
        )
      })}
    </section>
  )
}
