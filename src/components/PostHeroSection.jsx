import { useHomeHeroFlavor } from '../context/HomeHeroFlavorContext.jsx'
import {
  heroFlavorColorTransitionClass,
  postHeroIconAccentClass,
} from '../lib/homeHeroFlavor.js'

export function PostHeroSection() {
  const { flavor } = useHomeHeroFlavor()
  const iconAccent = `${postHeroIconAccentClass(flavor)} ${heroFlavorColorTransitionClass}`

  return (
    <section
      id="post-hero"
      aria-label="Contenido principal"
      className="relative min-h-0 bg-transparent px-site-x py-site-y-tight [view-transition-name:post-hero] lg:min-h-[min(120vh,1400px)] lg:py-site-y-loose"
    >
      <div className="mx-auto flex min-h-0 w-full max-w-[120rem] flex-col items-center justify-center gap-[clamp(2rem,5svh,5rem)] lg:min-h-[calc(120vh-clamp(8rem,28vh,16rem))]">
        <p className="m-0 max-w-[100rem] text-center font-editorial text-pretty leading-[1.12] tracking-[-0.01em] text-black text-[clamp(1rem,2.8vw,2rem)] max-lg:max-w-[min(100%,36rem)] md:text-[clamp(1rem,2.4vw,2.5rem)] lg:text-[clamp(1.8rem,3.2vw,4.5rem)] lg:leading-[1.1] lg:max-w-none">
          Currently cooking <span className={iconAccent}>🏠︎</span> at the
          intersection of art, technology{' '}
          <span className={iconAccent}>🙵</span> communication. Focused{' '}
          <span className={iconAccent}>𖦏</span> on creating delicious
          experiences for both brands and consumers{' '}
          <span className={iconAccent}>✌︎</span>.
        </p>

        <div className="grid w-full max-w-[100rem] grid-cols-1 items-center gap-y-[clamp(1rem,3vw,2rem)] max-lg:max-w-[min(100%,42rem)] lg:grid-cols-[1.2fr_2.5fr_1.2fr] lg:gap-x-[clamp(1.5rem,4vw,4rem)] lg:gap-y-0">
          <p className="m-0 text-center font-editorial text-[clamp(0.95rem,2.4vw,1.6rem)] leading-[1.15] text-black text-pretty md:text-[clamp(0.9rem,2vw,1.5rem)] lg:text-[clamp(1.1rem,2vw,2.5rem)] lg:text-left">
            Whipping it quirky and fun...
          </p>

          <div
            aria-hidden="true"
            className="mx-auto aspect-4/3 w-full max-w-[min(100%,440px)] bg-black lg:max-w-[min(100%,min(52rem,46vw))]"
          />

          <p className="m-0 text-center font-editorial text-[clamp(0.95rem,2.4vw,1.6rem)] leading-[1.15] text-black text-pretty md:text-[clamp(0.9rem,2vw,1.5rem)] lg:text-[clamp(1.1rem,2vw,2.5rem)] lg:text-right">
            Yet effective, simple and clean.
          </p>
        </div>
      </div>
    </section>
  )
}
