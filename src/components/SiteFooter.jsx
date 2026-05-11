import NameDisplay from './NameDisplay.jsx'


const MAIL = 'sammy.cabello.g@gmail.com'
const HANDLE = 'sammytsukino'


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
      <div className="mx-auto w-full max-w-[90rem] px-site-x pb-[clamp(1.75rem,min(8vw),3.5rem)] pt-[clamp(2.25rem,min(8vw),6rem)] lg:px-[clamp(1.25rem,5vw,3.5rem)] lg:pt-[clamp(2.75rem,min(10vw),6rem)]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-20 xl:gap-28">
          <div className="font-editorial text-[clamp(0.9rem,calc(0.35rem+2.2vw),1rem)] leading-[1.45] tracking-[0.01em] lg:text-[clamp(0.875rem,1.05vw,1rem)]">
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
          className="absolute left-0 pl-site-x lg:pl-[clamp(1.25rem,5vw,3.5rem)]"
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




