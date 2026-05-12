import NameDisplay from './NameDisplay.jsx'

const MAIL = 'sammy.cabello.g@gmail.com'
const LINKEDIN_HREF = 'https://www.linkedin.com/in/sammycabello'
const LINKEDIN_LABEL = 'linkedin.com/sammycabello'
const GITHUB_HREF = 'https://github.com/sammytsukino'
const GITHUB_LABEL = 'github.com/sammytsukino'

const linkClass =
  `text-inherit underline decoration-neutral-950/30 underline-offset-[5px] ` +
  `transition-colors hover:decoration-neutral-950`

export default function SiteFooter() {
  return (
    <footer
      className={
        `relative z-20 flex w-full min-w-0 shrink-0 flex-col overflow-x-clip bg-portfolio-bg ` +
        `text-black min-h-0 max-lg:mt-[clamp(1rem,3.5svh,2rem)] max-lg:overflow-y-visible ` +
        `lg:mt-[clamp(4rem,14svh,10rem)] lg:min-h-[100svh] lg:overflow-y-clip`
      }
      aria-label="Pie de página"
    >
      <div
        id="footer-contact"
        className={
          `relative z-10 mx-auto w-full max-w-[90rem] shrink-0 scroll-mt-[var(--hero-frame-inset)] ` +
          `bg-portfolio-bg px-[var(--hero-frame-inset)] text-black ` +
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
              `lg:max-w-[min(100%,22ch)] lg:text-[clamp(1.65rem,4vw,3.35rem)]`
            }
          >
            Craving a chat? Let’s cook something up together{' '}
            <span className="text-portfolio-lime" aria-hidden>
              ✉
            </span>
          </p>

          <nav className="font-editorial" aria-label="Contacto y redes">
            <ul className="m-0 flex list-none flex-col gap-y-2.5 p-0 text-left text-black text-[clamp(0.78rem,2.8vw,1rem)] leading-snug tracking-[0.01em] md:text-[clamp(0.72rem,2.35vw,0.9rem)] lg:items-end lg:gap-y-3 lg:text-[clamp(0.8rem,1.85vw,1rem)] lg:text-right">
              <li>
                <a href={`mailto:${MAIL}`} className={linkClass}>
                  {MAIL}
                </a>
              </li>
              <li>
                <a
                  href={LINKEDIN_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className={linkClass}
                >
                  {LINKEDIN_LABEL}
                </a>
              </li>
              <li>
                <a
                  href={GITHUB_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className={linkClass}
                >
                  {GITHUB_LABEL}
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
          <NameDisplay variant="footer" />
        </div>
      </div>
    </footer>
  )
}
