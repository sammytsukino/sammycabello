import { useCallback, useEffect, useRef, useState } from 'react'
import { useHomeHeroFlavor } from '../context/HomeHeroFlavorContext.jsx'
import { HomeHeroFlavorSwitch } from './HomeHeroFlavorSwitch.jsx'
import { HomeHeroImageTrail } from './HomeHeroImageTrail.jsx'
import NameDisplay from './NameDisplay.jsx'
import {
  NAV_GESTURE_CLICK_DELAY_MS,
  scrollToPageSectionById,
} from '../lib/initLenis.js'
import { playContactBellSound } from '../lib/playUiSound.js'

const BELL_DEFAULT_SRC =
  'https://res.cloudinary.com/dsy30p7gf/image/upload/v1779036061/Recurso_19bell_p5cujx.svg'
const BELL_HOVER_SRC =
  'https://res.cloudinary.com/dsy30p7gf/image/upload/v1779036027/Recurso_20bell_l3y6eu.svg'
const BELL_ACTIVE_SRC =
  'https://res.cloudinary.com/dsy30p7gf/image/upload/v1779036015/Recurso_18bell_t9rxza.svg'

const contactBellBtnClass =
  `group relative flex shrink-0 cursor-pointer ` +
  `size-[clamp(3.35rem,9.1vw,4.05rem)] ` +
  `md:size-[clamp(2.95rem,7.85vw,3.45rem)] ` +
  `lg:size-[clamp(3.5rem,9.5vw,4.25rem)] ` +
  `desktop-std:lg:size-[clamp(3.1rem,8.4vw,3.75rem)] ` +
  `items-end justify-center rounded-full border-0 bg-transparent p-0 text-black ` +
  `focus-visible:outline focus-visible:outline-2 ` +
  `focus-visible:outline-offset-4 focus-visible:outline-neutral-950/50`

const contactBellIconWrapClass =
  `relative block size-[clamp(2.65rem,7.35vw,3.35rem)] ` +
  `md:size-[clamp(2.35rem,6.35vw,2.95rem)] ` +
  `lg:size-[clamp(2.8rem,7.75vw,3.5rem)] ` +
  `desktop-std:lg:size-[clamp(2.5rem,6.85vw,3.1rem)]`

const contactBellImgBase =
  `absolute inset-0 size-full object-contain transition-opacity duration-200 ease-out`

function ContactBellIcon({ showActive }) {
  return (
    <span className={contactBellIconWrapClass} aria-hidden>
      <img
        src={BELL_DEFAULT_SRC}
        alt=""
        width={48}
        height={48}
        draggable={false}
        className={
          `${contactBellImgBase} ` +
          (showActive
            ? 'opacity-0'
            : 'opacity-100 group-hover:opacity-0 group-focus-visible:opacity-0')
        }
      />
      <img
        src={BELL_HOVER_SRC}
        alt=""
        width={48}
        height={48}
        draggable={false}
        className={
          `${contactBellImgBase} opacity-0 ` +
          (showActive
            ? ''
            : 'group-hover:opacity-100 group-focus-visible:opacity-100')
        }
      />
      <img
        src={BELL_ACTIVE_SRC}
        alt=""
        width={48}
        height={48}
        draggable={false}
        className={
          `${contactBellImgBase} ` +
          (showActive ? 'opacity-100' : 'opacity-0 group-active:opacity-100')
        }
      />
    </span>
  )
}

function ContactBellButton() {
  const [showClickState, setShowClickState] = useState(false)
  const clickResetTimerRef = useRef(null)

  useEffect(() => {
    return () => {
      if (clickResetTimerRef.current !== null) {
        window.clearTimeout(clickResetTimerRef.current)
      }
    }
  }, [])

  const handleContactNav = useCallback(() => {
    playContactBellSound()

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const clickDelayMs = reducedMotion ? 0 : NAV_GESTURE_CLICK_DELAY_MS

    setShowClickState(true)
    scrollToPageSectionById('footer-contact', { delayMs: clickDelayMs })

    if (clickResetTimerRef.current !== null) {
      window.clearTimeout(clickResetTimerRef.current)
    }
    clickResetTimerRef.current = window.setTimeout(() => {
      setShowClickState(false)
      clickResetTimerRef.current = null
    }, clickDelayMs)
  }, [])

  return (
    <button
      type="button"
      className={`${contactBellBtnClass} justify-self-center`}
      aria-label="Ir a la zona de contacto"
      onClick={handleContactNav}
    >
      <ContactBellIcon showActive={showClickState} />
    </button>
  )
}

const TOP_CHROME_SLOT =
  `size-[clamp(2.65rem,7.6vw,3.15rem)] shrink-0 ` +
  `md:size-[clamp(2.45rem,6.55vw,2.85rem)] ` +
  `lg:size-[clamp(2.75rem,7.7vw,3.35rem)] ` +
  `desktop-std:lg:size-[clamp(2.45rem,6.85vw,3rem)]`

const INSTAGRAM_HANDLE = 'sammy.cabello'
const HERO_HEADLINE_TEXT =
  'BITE SIZED WHIMSY.\n' + 'FULL-COURSE FUNCTIONALITY.'
const HERO_HEADLINE_ARIA =
  'BITE SIZED WHIMSY. FULL-COURSE FUNCTIONALITY.'

export function HomeHeroSection() {
  const heroRef = useRef(null)
  const { flavor, config } = useHomeHeroFlavor()

  return (
    <div
      ref={heroRef}
      id="home-hero"
      role="region"
      aria-label="Inicio y presentación"
      data-hero-flavor={flavor}
      className={
        `relative isolate grid min-h-svh h-svh w-full shrink-0 grid-rows-[auto_1fr_auto] ` +
        `overflow-x-clip bg-transparent px-[var(--hero-frame-inset)] ` +
        `pb-[calc(var(--hero-frame-inset)+env(safe-area-inset-bottom,0px))] ` +
        `pt-[calc(var(--hero-frame-inset)+env(safe-area-inset-top,0px))] ` +
        `[view-transition-name:hero]`
      }
    >
      <HomeHeroImageTrail
        key={flavor}
        containerRef={heroRef}
        images={config.trailImages}
        flavorKey={flavor}
      />

      <header
        className={
          `relative z-[1] flex w-full items-start justify-between gap-x-2 ` +
          `min-h-[clamp(2.65rem,7.6vw,3.15rem)] md:min-h-[clamp(2.45rem,6.55vw,2.85rem)] ` +
          `lg:min-h-[clamp(2.75rem,7.7vw,3.35rem)] ` +
          `desktop-std:lg:min-h-[clamp(2.45rem,6.85vw,3rem)]`
        }
      >
        <span className={`inline-block ${TOP_CHROME_SLOT}`} aria-hidden />
        <div className="flex min-w-0 flex-1 justify-center px-1">
          <NameDisplay variant="hero" />
        </div>
        <span className={`inline-block ${TOP_CHROME_SLOT}`} aria-hidden />
      </header>

      <h1
        className="relative z-[1] m-0 flex min-h-0 w-full min-w-0 items-center justify-center px-1 py-[clamp(0.5rem,2svh,1.5rem)] font-normal"
        aria-label={HERO_HEADLINE_ARIA}
      >
        <NameDisplay
          variant="heroHeadline"
          trigger="auto"
          autoIntervalMs={800}
          text={HERO_HEADLINE_TEXT}
          accent="alternate"
        />
      </h1>

      <footer className="relative z-[1] grid w-full grid-cols-[1fr_auto_1fr] items-end gap-x-3 text-black">
        <p className="m-0 self-end justify-self-start text-left">
          <a
            href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`Instagram @${INSTAGRAM_HANDLE} (se abre en una nueva pestaña)`}
            className="font-sans text-[clamp(0.54rem,1.22vw,0.64rem)] font-medium uppercase tracking-[0.14em] text-inherit no-underline transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950/45 md:text-[clamp(0.5rem,1.05vw,0.58rem)] lg:text-[clamp(0.56rem,1.35vw,0.6875rem)] desktop-std:lg:text-[clamp(0.5rem,1.15vw,0.62rem)]"
          >
            @{INSTAGRAM_HANDLE.toUpperCase()}
          </a>
        </p>

        <ContactBellButton />

        <HomeHeroFlavorSwitch />
      </footer>
    </div>
  )
}
