import NameDisplay from './NameDisplay.jsx'

const MAIL = 'sammy.cabello.g@gmail.com'
const LINKEDIN_HREF = 'https://www.linkedin.com/in/sammycabello'
const LINKEDIN_LABEL = 'linkedin.com/sammycabello'
const GITHUB_HREF = 'https://github.com/sammytsukino'
const GITHUB_LABEL = 'github.com/sammytsukino'

const FOOTER_NAME_SHIFT = {
  x: '-2rem',
  y: '2rem',
}

const linkClass =
  `text-inherit underline decoration-neutral-950/30 underline-offset-[5px] ` +
  `transition-colors hover:decoration-neutral-950`

export default function SiteFooter() {
  return (
    <footer
      className={
        `relative z-20 mt-[clamp(4rem,14svh,10rem)] flex min-h-[100svh] w-full ` +
        `min-w-0 shrink-0 flex-col bg-portfolio-bg text-black`
      }
      aria-label="Pie de página"
    >
      <div
        id="footer-contact"
        className={
          `mx-auto w-full max-w-[90rem] shrink-0 scroll-mt-[var(--hero-frame-inset)] ` +
          `px-[var(--hero-frame-inset)] pb-[clamp(2rem,min(8vw),3.5rem)] ` +
          `pt-[clamp(4rem,min(24svh,14rem),18rem)] text-black`
        }
      >
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-end lg:gap-x-[clamp(2rem,8vw,5rem)]">
          <p
            className={
              `m-0 max-w-[min(100%,22ch)] font-editorial font-normal leading-[1.08] ` +
              `tracking-[-0.02em] text-black ` +
              `text-[clamp(1.65rem,4vw,3.35rem)]`
            }
          >
            Craving a chat? Let’s cook something up together{' '}
            <span className="text-portfolio-lime" aria-hidden>
              ✉
            </span>
          </p>

          <nav className="font-editorial" aria-label="Contacto y redes">
            <ul className="m-0 flex list-none flex-col gap-y-3 p-0 text-right text-black text-[clamp(0.8rem,1.85vw,1rem)] leading-snug tracking-[0.01em] lg:items-end">
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
        className="relative isolate flex min-h-0 min-w-0 flex-1 overflow-hidden"
        style={{
          ['--sf-name-shift-x']: FOOTER_NAME_SHIFT.x,
          ['--sf-name-shift-y']: FOOTER_NAME_SHIFT.y,
        }}
      >
        <div
          className="absolute left-0 pl-[var(--hero-frame-inset)]"
          style={{
            bottom: 'calc(0px - var(--sf-name-shift-y, 0px))',
            transform: 'translateX(var(--sf-name-shift-x, 0px))',
          }}
        >
          <NameDisplay variant="footer" />
        </div>
      </div>
    </footer>
  )
}
