import { useHomeHeroFlavor } from '../context/HomeHeroFlavorContext.jsx'
import {
  flavorLinkHoverClass,
  heroFlavorColorTransitionClass,
  postHeroIconAccentClass,
} from '../lib/homeHeroFlavor.js'
import NameDisplay from './NameDisplay.jsx'

const MAIL = 'sammy.cabello.g@gmail.com'
const LINKEDIN_HREF = 'https://www.linkedin.com/in/sammycabello'
const LINKEDIN_LABEL = 'linkedin.com/sammycabello'
const GITHUB_HREF = 'https://github.com/sammytsukino'
const GITHUB_LABEL = 'github.com/sammytsukino'

export default function SiteFooter() {
  const { flavor } = useHomeHeroFlavor()
  const iconAccent = `${postHeroIconAccentClass(flavor)} ${heroFlavorColorTransitionClass}`
  const linkClass = 'flex items-center gap-2 text-inherit no-underline hover:underline'

  return (
    <footer
      className={
        `relative z-20 flex w-full min-w-0 shrink-0 flex-col overflow-x-clip bg-transparent ` +
        `text-black min-h-0 max-lg:mt-[clamp(1rem,3.5svh,2rem)] max-lg:overflow-y-visible ` +
        `lg:mt-[clamp(4rem,14svh,10rem)] lg:min-h-[100svh] lg:overflow-y-clip ` +
        `desktop-std:lg:mt-[clamp(3rem,12svh,8rem)] desktop-std:lg:min-h-[92svh]`
      }
      aria-label="Pie de página"
    >
      <div
        id="footer-contact"
        className={
          `relative z-10 mx-auto w-full max-w-[90rem] shrink-0 scroll-mt-[var(--hero-frame-inset)] ` +
          `bg-transparent px-[var(--hero-frame-inset)] text-black ` +
          `max-lg:mb-[clamp(-2.5rem,-8vw,-1.25rem)] max-lg:pb-2 max-lg:pt-3 ` +
          `lg:mb-0 lg:pb-[clamp(2rem,min(8vw),3.5rem)] ` +
          `lg:pt-[clamp(4rem,min(24svh,14rem),18rem)]`
        }
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-end lg:gap-12 lg:gap-x-[clamp(2rem,8vw,5rem)]">
          <p
            className={
              `m-0 w-full max-w-none font-editorial font-normal leading-[1.08] ` +
              `tracking-[-0.02em] text-black ` +
              `text-[clamp(1.35rem,3.6vw,3.35rem)] md:text-[clamp(1.2rem,3.05vw,2.75rem)] ` +
              `lg:max-w-[min(100%,22ch)] lg:text-[clamp(1.65rem,4vw,3.35rem)] ` +
              `desktop-std:lg:text-[clamp(1.45rem,3.5vw,2.75rem)]`
            }
          >
            Craving a chat? Let’s cook something up together{' '}
            <span className={iconAccent} aria-hidden>
              ✉
            </span>
          </p>

          <nav className="font-editorial" aria-label="Contacto y redes">
            <ul className="m-0 flex list-none flex-col gap-y-2.5 p-0 text-left text-black text-[clamp(0.78rem,2.8vw,1rem)] leading-snug tracking-[0.01em] md:text-[clamp(0.72rem,2.35vw,0.9rem)] lg:items-end lg:gap-y-3 lg:text-[clamp(0.8rem,1.85vw,1rem)] lg:text-right desktop-std:lg:text-[clamp(0.72rem,1.6vw,0.9rem)]">
              <li>
                <a href={`mailto:${MAIL}`} className={linkClass}>
                  <svg
                    className={`size-[1.1em] shrink-0 fill-current ${iconAccent}`}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <span>{MAIL}</span>
                </a>
              </li>
              <li>
                <a
                  href={LINKEDIN_HREF}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn de Sammy Cabello (se abre en una nueva pestaña)"
                  className={linkClass}
                >
                  <svg
                    className={`size-[1.1em] shrink-0 fill-current ${iconAccent}`}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span>sammycabello</span>
                </a>
              </li>
              <li>
                <a
                  href={GITHUB_HREF}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub de Sammy Cabello (se abre en una nueva pestaña)"
                  className={linkClass}
                >
                  <svg
                    className={`size-[1.1em] shrink-0 fill-current ${iconAccent}`}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>sammytsukino</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <p className="sr-only">
          Pie de página: {MAIL}, {LINKEDIN_LABEL}, {GITHUB_LABEL}.
        </p>
      </div>

      <div
        className={
          `relative z-0 isolate flex min-w-0 flex-1 flex-col justify-end overflow-x-clip ` +
          `max-lg:flex-none max-lg:min-h-[clamp(15rem,min(56svh,50vw),30rem)] ` +
          `max-lg:overflow-y-visible ` +
          `lg:min-h-0 lg:overflow-y-clip`
        }
      >
        <div
          className={
            `shrink-0 pl-[var(--hero-frame-inset)] ` +
            `pb-[max(0px,env(safe-area-inset-bottom))]`
          }
          style={{ transform: 'translateX(-2rem)' }}
        >
          <NameDisplay variant="footer" accent={flavor === 'pink' ? 'green' : 'pink'} />
        </div>
      </div>
    </footer>
  )
}
