import NameDisplay from './NameDisplay.jsx'

const LINKEDIN_URL =
  'https://www.linkedin.com/in/sammycabello/'
const MAIL = 'sammy.cabello.g@gmail.com'
const HANDLE = 'sammytsukino'

const SOCIAL_COLUMN_COUNT = 3

const FOOTER_NAME_SHIFT = {
  x: '-2rem',
  y: '2rem',
}

export default function SiteFooter() {
  return (
    <footer
      className="w-full min-w-0 shrink-0 border-t border-neutral-950/25 bg-portfolio-bg text-black"
      aria-label="Pie de página"
    >
      <div className="mx-auto w-full max-w-[90rem] px-[clamp(1.25rem,5vw,3.5rem)] pb-[clamp(1.75rem,min(8vw),3.5rem)] pt-[clamp(2.75rem,min(10vw),6rem)]">
        <div className="grid gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:items-start md:gap-20 xl:gap-28">
          <div className="font-editorial text-[clamp(0.875rem,1.05vw,1rem)] leading-[1.45] tracking-[0.01em]">
            <p className="m-0">
              <a
                href={`https://instagram.com/${HANDLE.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="text-inherit underline decoration-neutral-950/35 underline-offset-4 hover:decoration-neutral-950"
              >
                {HANDLE}
              </a>
            </p>
            <p className="m-0 mt-2">
              <a
                href={`mailto:${MAIL}`}
                className="break-all text-inherit underline decoration-neutral-950/35 underline-offset-4 hover:decoration-neutral-950"
              >
                {MAIL}
              </a>
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-14 gap-y-10 sm:grid-cols-3 sm:justify-items-stretch md:justify-items-start">
            {Array.from({ length: SOCIAL_COLUMN_COUNT }).map((_, col) => (
              <SocialColumn key={col} />
            ))}
          </div>
        </div>

        <p className="sr-only">Pie de página: contacto {MAIL}, marca Sammy.</p>
      </div>

      <div
        className="relative isolate mt-[clamp(2rem,min(12vw),4rem)] w-full min-w-0 overflow-hidden"
        style={{
          ['--sf-name-shift-x']: FOOTER_NAME_SHIFT.x,
          ['--sf-name-shift-y']: FOOTER_NAME_SHIFT.y,
          minHeight:
            'max(0px, calc(clamp(220px, min(52vh, 640px), 640px) - var(--sf-name-shift-y)))',
        }}
      >
        <div
          className="absolute left-0 pl-[clamp(1.25rem,5vw,3.5rem)]"
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

function SocialColumn() {
  return (
    <div className="min-w-0 font-editorial">
      <p className="m-0 text-[clamp(0.65rem,0.85vw,0.75rem)] uppercase tracking-[0.28em] text-neutral-800">
        Social
      </p>
      <nav className="mt-5 flex flex-col gap-7 border-t border-neutral-950 pt-[1rem] text-[clamp(0.8rem,0.95vw,0.9375rem)] leading-snug lowercase tracking-normal">
        <FooterLink href={LINKEDIN_URL} label="linkedin.com/sammycabello" />
        <FooterLink href={LINKEDIN_URL} label="linkedin.com/sammycabello" />
      </nav>
    </div>
  )
}

function FooterLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="break-all text-inherit underline decoration-neutral-950/30 underline-offset-[3px] transition-colors hover:decoration-neutral-950"
    >
      {label}
    </a>
  )
}
