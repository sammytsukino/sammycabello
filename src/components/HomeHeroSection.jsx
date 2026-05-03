import { scrollToIdWithTransition } from '../lib/scrollWithViewTransition.js'
import { HeroFeaturedWorks } from './HeroFeaturedWorks.jsx'
import NameDisplay from './NameDisplay.jsx'
import { PortfolioHeroTitle } from './PortfolioHeroTitle.jsx'

function HeroContinuarControl() {
  return (
    <button
      type="button"
      aria-label="Ir a la siguiente sección del portfolio"
      className="absolute inset-x-0 bottom-0 z-10 min-h-[4.75rem] w-full touch-manipulation bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950/70"
      onClick={() => scrollToIdWithTransition('post-hero')}
    />
  )
}

export function HomeHeroSection() {
  return (
    <div className="relative flex h-[calc(100svh-50px)] min-h-[calc(100svh-50px)] w-full shrink-0 flex-col bg-portfolio-bg [view-transition-name:hero]">
      <div className="flex min-h-[min(14vw,18vh)] w-full shrink-0 items-center justify-center overflow-visible py-[clamp(0.75vw,2vw,1rem)]">
        <NameDisplay />
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-center overflow-visible py-[clamp(0.5vw,1.5vw,2vh)]">
        <div className="flex min-h-0 w-full flex-1 flex-col justify-center overflow-x-clip overflow-y-visible">
          <PortfolioHeroTitle />
        </div>
      </div>

      <div className="flex w-full shrink-0 justify-center pb-[clamp(1.5rem,min(8vw),4rem)]">
        <HeroFeaturedWorks />
      </div>

      <HeroContinuarControl />
    </div>
  )
}
