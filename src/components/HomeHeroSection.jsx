import NameDisplay from './NameDisplay.jsx'

const TOP_CHROME_SLOT =
  `size-[clamp(3.1rem,8.75vw,3.75rem)] shrink-0`

const INSTAGRAM_HANDLE = 'sammycabello'
const HERO_HEADLINE_TEXT =
  'BITE SIZED WHIMSY.\n' + 'FULL-COURSE FUNCTIONALITY.'
const HERO_HEADLINE_ARIA =
  'BITE SIZED WHIMSY. FULL-COURSE FUNCTIONALITY.'

export function HomeHeroSection() {
  return (
    <div
      id="home-hero"
      className={
        `relative isolate grid min-h-svh h-svh w-full shrink-0 grid-rows-[auto_1fr_auto] ` +
        `bg-transparent px-[var(--hero-frame-inset)] ` +
        `pb-[calc(var(--hero-frame-inset)+env(safe-area-inset-bottom,0px))] ` +
        `pt-[calc(var(--hero-frame-inset)+env(safe-area-inset-top,0px))] ` +
        `[view-transition-name:hero]`
      }
    >
      <header
        className={
          `relative z-[1] flex w-full items-start justify-between gap-x-2 ` +
          `min-h-[clamp(3.1rem,8.75vw,3.75rem)]`
        }
      >
        <span className={`inline-block ${TOP_CHROME_SLOT}`} aria-hidden />
        <div className="flex min-w-0 flex-1 justify-center px-1">
          <NameDisplay variant="hero" />
        </div>
        <span className={`inline-block ${TOP_CHROME_SLOT}`} aria-hidden />
      </header>

      <h1
        className="relative z-0 m-0 flex min-h-0 w-full min-w-0 items-center justify-center px-1 py-[clamp(0.5rem,2svh,1.5rem)] font-normal"
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

      <footer className="relative z-[1] flex w-full items-end justify-between gap-x-3 text-black">
        <p className="m-0 self-end text-left">
          <a
            href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
            target="_blank"
            rel="noreferrer"
            className="font-sans text-[clamp(0.56rem,1.35vw,0.6875rem)] font-medium uppercase tracking-[0.14em] text-inherit no-underline transition-opacity hover:opacity-70"
          >
            @{INSTAGRAM_HANDLE.toUpperCase()}
          </a>
        </p>

        <p className="m-0 self-end text-right font-sans text-[clamp(0.65rem,1.5vw,0.8125rem)] tracking-[0.06em]">
          SVQ
        </p>
      </footer>
    </div>
  )
}
