import { useDvdScreensaver } from 'react-dvd-screensaver'
import { forwardRef, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HOME_DVD_SCREENSAVER_IMAGES } from '../data/homeDvdScreensaverImages.js'
import { HOME_DVD_SCREENSAVER_LINKS } from '../data/homeDvdScreensaverLinks.js'
import { scrollToIdWithTransition } from '../lib/scrollWithViewTransition.js'
import NameDisplay from './NameDisplay.jsx'

const SPEEDS_TEXT = [2, 2.35, 2.7]
const SPEEDS_IMAGE = [1.1, 1.45, 1.8, 2.05]

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

function BouncingDvdImage({ src, alt, speed, containerRef }) {
  const { elementRef } = useDvdScreensaver({ speed, containerRef })

  return (
    <div
      ref={elementRef}
      style={{ position: 'absolute', top: 0, left: 0 }}
      className="pointer-events-none z-0 select-none opacity-100"
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="block h-auto w-[clamp(88px,18vw,400px)] max-w-[400px] object-cover"
      />
    </div>
  )
}

function BouncingScreensaverLink({ item, speed, containerRef }) {
  const { elementRef } = useDvdScreensaver({
    speed,
    freezeOnHover: true,
    containerRef,
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

  return (
    <section
      id="home-dvd-screensaver"
      aria-label="Enlaces del portfolio"
      className="relative isolate h-[100svh] w-full overflow-hidden bg-portfolio-bg"
    >
      <div
        ref={boundsRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      />
      {HOME_DVD_SCREENSAVER_IMAGES.map((img, i) => (
        <BouncingDvdImage
          key={img.src}
          src={img.src}
          alt={img.alt}
          speed={SPEEDS_IMAGE[i] ?? SPEEDS_IMAGE[0]}
          containerRef={boundsRef}
        />
      ))}
      {HOME_DVD_SCREENSAVER_LINKS.map((item, i) => (
        <BouncingScreensaverLink
          key={item.sectionId ?? item.to}
          item={item}
          speed={SPEEDS_TEXT[i] ?? SPEEDS_TEXT[0]}
          containerRef={boundsRef}
        />
      ))}
    </section>
  )
}
