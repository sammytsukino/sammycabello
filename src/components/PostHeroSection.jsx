import { useEffect, useRef } from 'react'
import { useHomeHeroFlavor } from '../context/HomeHeroFlavorContext.jsx'
import {
  heroFlavorColorTransitionClass,
  postHeroIconAccentClass,
} from '../lib/homeHeroFlavor.js'

const POST_HERO_VIDEO_SRC =
  'https://res.cloudinary.com/dsy30p7gf/video/upload/q_auto,f_mp4/v1779272918/lumenbn3_glzije.mp4'
const POST_HERO_VIDEO_POSTER =
  'https://res.cloudinary.com/dsy30p7gf/video/upload/so_0,q_auto,f_jpg/v1779272918/lumenbn3_glzije.jpg'

function PostHeroVideo() {
  const wrapRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const video = videoRef.current
    if (!wrap || !video) return

    const tryPlay = () => {
      void video.play().catch(() => {})
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay()
        else video.pause()
      },
      { threshold: 0.12 },
    )
    observer.observe(wrap)
    tryPlay()

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[min(100%,440px)] overflow-hidden bg-black lg:max-w-[min(100%,min(36rem,40vw))] desktop-std:lg:max-w-[min(100%,min(32rem,34vw))]"
    >
      <video
        ref={videoRef}
        src={POST_HERO_VIDEO_SRC}
        poster={POST_HERO_VIDEO_POSTER}
        aria-label="Vídeo decorativo de presentación"
        className="absolute inset-0 block h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
    </div>
  )
}

export function PostHeroSection() {
  const { flavor } = useHomeHeroFlavor()
  const iconAccent = `${postHeroIconAccentClass(flavor)} ${heroFlavorColorTransitionClass}`

  return (
    <section
      id="post-hero"
      aria-label="Presentación editorial"
      className="relative min-h-0 bg-transparent px-site-x py-site-y-tight [view-transition-name:post-hero] lg:min-h-[min(120vh,1400px)] lg:py-site-y-loose desktop-std:lg:min-h-[min(108vh,1200px)]"
    >
      <div className="mx-auto flex min-h-0 w-full max-w-[120rem] flex-col items-center justify-center gap-[clamp(3.25rem,8svh,7rem)] lg:min-h-[calc(120vh-clamp(8rem,28vh,16rem))] desktop-std:lg:min-h-[calc(108vh-clamp(7rem,24vh,14rem))] desktop-std:gap-[clamp(2.75rem,7svh,6rem)]">
        <p className="m-0 max-w-[100rem] text-center font-editorial text-pretty leading-[1.12] tracking-[-0.01em] text-black text-[clamp(1.45rem,5.2vw,2.35rem)] max-lg:max-w-[min(100%,46rem)] md:text-[clamp(1.6rem,3.8vw,2.8rem)] lg:text-[clamp(1.8rem,3.2vw,4.5rem)] lg:leading-[1.1] lg:max-w-none desktop-std:lg:text-[clamp(1.55rem,2.75vw,3.5rem)]">
          Currently cooking <span className={iconAccent} aria-hidden>🏠︎</span> at the
          intersection of art, technology{' '}
          <span className={iconAccent} aria-hidden>🙵</span> communication. Focused{' '}
          <span className={iconAccent} aria-hidden>𖦏</span> on creating delicious
          experiences for both brands and consumers{' '}
          <span className={iconAccent} aria-hidden>✌︎</span>.
        </p>

        <div className="mt-[clamp(2.25rem,5.5svh,4.5rem)] grid w-full max-w-[100rem] grid-cols-1 items-center gap-y-[clamp(1rem,3vw,2rem)] max-lg:max-w-[min(100%,42rem)] lg:mt-[clamp(3rem,6.5svh,5.25rem)] lg:grid-cols-[1.2fr_2.5fr_1.2fr] lg:gap-x-[clamp(1.5rem,4vw,4rem)] lg:gap-y-0">
          <p className="m-0 text-center font-editorial text-[clamp(1.15rem,3.8vw,1.8rem)] leading-[1.15] text-black text-pretty md:text-[clamp(1.1rem,2.8vw,1.75rem)] lg:text-[clamp(1.1rem,2vw,2.5rem)] lg:text-left desktop-std:lg:text-[clamp(1rem,1.75vw,2rem)]">
            Whipping it quirky and fun...
          </p>

          <PostHeroVideo />

          <p className="m-0 text-center font-editorial text-[clamp(1.15rem,3.8vw,1.8rem)] leading-[1.15] text-black text-pretty md:text-[clamp(1.1rem,2.8vw,1.75rem)] lg:text-[clamp(1.1rem,2vw,2.5rem)] lg:text-right desktop-std:lg:text-[clamp(1rem,1.75vw,2rem)]">
            Yet effective, simple and clean.
          </p>
        </div>
      </div>
    </section>
  )
}
