import { scrollToPageSectionById, scrollToPageTop } from '../lib/initLenis.js'

const LOGO_OUTLINE_SRC =
  'https://res.cloudinary.com/dsy30p7gf/image/upload/v1778581336/Recurso_12estrellarellena_matdlv.svg'
const LOGO_FILLED_SRC =
  'https://res.cloudinary.com/dsy30p7gf/image/upload/v1778581291/Recurso_11estrellarellena_aoc12t.svg'

const HAMBURGER_OUTLINE_SRC =
  'https://res.cloudinary.com/dsy30p7gf/image/upload/v1778577141/Recurso_9hamburguesa_yaaikp.svg'
const HAMBURGER_FILLED_SRC =
  'https://res.cloudinary.com/dsy30p7gf/image/upload/v1778577141/Recurso_8hamburguesarellena_xynox8.svg'

const navBtnClass =
  `group relative flex shrink-0 cursor-pointer ` +
  `size-[clamp(2.95rem,8.1vw,3.6rem)] ` +
  `md:size-[clamp(2.6rem,7vw,3.05rem)] ` +
  `lg:size-[clamp(3.1rem,8.4vw,3.75rem)] ` +
  `desktop-std:lg:size-[clamp(2.75rem,7.4vw,3.35rem)] ` +
  `items-start justify-center rounded-full border-0 bg-transparent p-0 text-black ` +
  `focus-visible:outline focus-visible:outline-2 ` +
  `focus-visible:outline-offset-4 focus-visible:outline-neutral-950/50`

const swapIconWrapClass =
  `relative block size-[clamp(2.35rem,6.5vw,2.95rem)] ` +
  `md:size-[clamp(2.1rem,5.65vw,2.6rem)] ` +
  `lg:size-[clamp(2.5rem,6.85vw,3.1rem)] ` +
  `desktop-std:lg:size-[clamp(2.2rem,6vw,2.75rem)]`

const swapImgBase =
  `absolute inset-0 size-full object-contain transition-opacity duration-200 ease-out`

function SwappableNavIcon({ outlineSrc, filledSrc }) {
  return (
    <span className={swapIconWrapClass} aria-hidden>
      <img
        src={outlineSrc}
        alt=""
        width={48}
        height={48}
        draggable={false}
        className={
          `${swapImgBase} opacity-100 ` +
          `group-hover:opacity-0 group-focus-visible:opacity-0`
        }
      />
      <img
        src={filledSrc}
        alt=""
        width={48}
        height={48}
        draggable={false}
        className={
          `${swapImgBase} opacity-0 ` +
          `group-hover:opacity-100 group-focus-visible:opacity-100`
        }
      />
    </span>
  )
}

export function HomeLandingFixedNav() {
  return (
    <nav
      className={
        `pointer-events-none fixed inset-x-0 top-0 z-[100] flex items-start ` +
        `justify-between px-[var(--hero-frame-inset)] ` +
        `pt-[calc(var(--hero-frame-inset)+env(safe-area-inset-top,0px))]`
      }
      aria-label="Navegación fija"
    >
      <div className="pointer-events-auto self-start">
        <button
          type="button"
          className={navBtnClass}
          aria-label="Ir al inicio de la página"
          onClick={() => scrollToPageTop()}
        >
          <SwappableNavIcon
            outlineSrc={LOGO_OUTLINE_SRC}
            filledSrc={LOGO_FILLED_SRC}
          />
        </button>
      </div>
      <div className="pointer-events-auto self-start">
        <button
          type="button"
          className={navBtnClass}
          aria-label="Ir a la sección menú DVD"
          onClick={() => scrollToPageSectionById('home-dvd-screensaver')}
        >
          <SwappableNavIcon
            outlineSrc={HAMBURGER_OUTLINE_SRC}
            filledSrc={HAMBURGER_FILLED_SRC}
          />
        </button>
      </div>
    </nav>
  )
}
