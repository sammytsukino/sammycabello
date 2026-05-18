import {
  HOME_GALLERY_ITEMS,
} from '../data/homeGalleryItems.js'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { Link } from 'react-router-dom'
import { GalleryFlavorLabel } from './GalleryFlavorLabel.jsx'

gsap.registerPlugin(ScrollTrigger, useGSAP)


function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n))
}


function galleryPinScrollDistanceScale() {
  if (typeof window === 'undefined') return 1
  return window.matchMedia('(max-width: 63.99rem)').matches ? 0.5 : 1
}

const ST_ID = 'home-gallery-horizontal'
const GALLERY_SLIDE_FRAME_CLASS =
  'relative flex h-[clamp(340px,58svh,460px)] w-[clamp(240px,42vw,320px)] shrink-0 items-center justify-center overflow-hidden p-0 ' +
  'sm:h-[clamp(380px,60svh,520px)] sm:w-[clamp(270px,45vw,380px)] ' +
  'md:h-[clamp(420px,60svh,580px)] md:w-[clamp(300px,45vw,420px)] ' +
  'lg:h-[clamp(340px,min(74svh,82vh),860px)] lg:w-[clamp(246px,min(82vw,calc(min(74svh,82vh)*0.75)),640px)] lg:max-w-[min(94vw,calc(min(74svh,82vh)*0.85))]'

const DEFAULT_GALLERY_INTRO_TEXT = 'a taste of my work →'
const DEFAULT_GALLERY_OUTRO_TEXT = 'hungry for more? ↴'
function GalleryTextPill({ children, className = '' }) {
  return (
    <span
      className={
        `box-border inline-block max-w-[min(100%,calc(100%-0.5rem))] ` +
        `px-[clamp(0.75rem,3vw,1.75rem)] py-[clamp(0.45rem,1.2vw,0.8rem)] ` +
        `text-center font-editorial text-[clamp(2rem,9.5vw,3.75rem)] font-medium lowercase ` +
        `sm:text-[clamp(2.75rem,8.5vw,5.5rem)] md:text-[clamp(2.2rem,6.75vw,4.15rem)] ` +
        `lg:text-[clamp(6.05rem,10.6vw,7.65rem)] ` +
        `leading-[1.08] tracking-normal text-black [text-wrap:balance] ` +
        className
      }
    >
      {children}
    </span>
  )
}
const LAST_GALLERY_SLIDE_IDX = HOME_GALLERY_ITEMS.length + 1

export function HomeInteractiveGallerySection({
  introContent,
  outroContent,
  introPillClassName = '',
  outroPillClassName = '',
} = {}) {
  const pinRef = useRef(null)
  const wrapRef = useRef(null)
  const trackRef = useRef(null)
  const slideRefs = useRef([])
  const galleryMotionScrollPxRef = useRef(1)

  const getMaxScrollX = useCallback(() => {
    const track = trackRef.current
    const wrap = wrapRef.current
    if (!track || !wrap) return 0
    return Math.max(0, track.scrollWidth - wrap.clientWidth)
  }, [])

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    const mqRm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mqBp = window.matchMedia('(max-width: 63.99rem)')
    mqRm.addEventListener('change', refresh)
    mqBp.addEventListener('change', refresh)
    return () => {
      mqRm.removeEventListener('change', refresh)
      mqBp.removeEventListener('change', refresh)
    }
  }, [])

  useGSAP(
    () => {
      const track = trackRef.current
      const wrap = wrapRef.current
      const pin = pinRef.current
      if (!track || !wrap || !pin) return

      const scrub = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? true
        : 1

      gsap.set(track, { clearProps: 'transform' })
      gsap.set(track, { x: 0 })

      let motionScrollPx = 1

      const measureCenterErrorPx = () => {
        const wr = wrap.getBoundingClientRect()
        const slide = slideRefs.current[LAST_GALLERY_SLIDE_IDX]
        if (!slide) return 0
        const sr = slide.getBoundingClientRect()
        return sr.left + sr.width / 2 - (wr.left + wr.width / 2)
      }

      const computePinnedScrollMetrics = () => {
        track.style.paddingRight = ''
        gsap.set(track, { x: 0 })
        void track.offsetWidth

        const wrapW = wrap.clientWidth
        const slide = slideRefs.current[LAST_GALLERY_SLIDE_IDX]
        let max = Math.max(0, track.scrollWidth - wrapW)

        if (!slide) {
          motionScrollPx = Math.max(max, 1)
          galleryMotionScrollPxRef.current = motionScrollPx
          return motionScrollPx
        }

        let motion = Math.max(0, measureCenterErrorPx())

        for (let i = 0; i < 10; i++) {
          let padExtra = Math.max(0, Math.ceil(motion - max))
          if (padExtra > 0) {
            const prev = Number.parseFloat(track.style.paddingRight) || 0
            track.style.paddingRight = `${prev + padExtra}px`
            void track.offsetWidth
            max = Math.max(0, track.scrollWidth - wrapW)
          }

          gsap.set(track, { x: -motion })
          void track.offsetWidth

          const err = measureCenterErrorPx()
          if (Math.abs(err) < 0.6) break
          motion += err
          if (motion < 0) motion = 0
        }

        gsap.set(track, { x: 0 })
        void track.offsetWidth

        motionScrollPx = Math.max(Math.ceil(motion), 1)
        galleryMotionScrollPxRef.current = motionScrollPx
        return motionScrollPx
      }

      computePinnedScrollMetrics()

      let tween = gsap.to(track, {
        x: -motionScrollPx,
        ease: 'none',
        scrollTrigger: {
          id: ST_ID,
          trigger: pin,
          start: 'top top',
          onRefresh(self) {
            computePinnedScrollMetrics()
            const anim = self.animation ?? tween
            if (anim?.vars) {
              anim.vars.x = -motionScrollPx
              anim.invalidate()
            }
          },
          end: () =>
            `+=${Math.max(
              1,
              Math.ceil(motionScrollPx * galleryPinScrollDistanceScale()),
            )}`,
          pin: true,
          scrub,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      return () => {
        track.style.paddingRight = ''
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    },
    { scope: pinRef },
  )

  useEffect(() => {
    const root = pinRef.current
    if (!root) return
    const imgs = root.querySelectorAll('img[data-gallery-slide-img]')
    if (!imgs.length) return

    let pending = imgs.length

    function onResolved() {
      pending -= 1
      if (pending <= 0) ScrollTrigger.refresh()
    }

    imgs.forEach((img) => {
      if (img.complete) {
        pending -= 1
      } else {
        img.addEventListener('load', onResolved, { once: true })
        img.addEventListener('error', onResolved, { once: true })
      }
    })

    if (pending <= 0) ScrollTrigger.refresh()

    return () => {
      imgs.forEach((img) => {
        img.removeEventListener('load', onResolved)
        img.removeEventListener('error', onResolved)
      })
    }
  }, [])

  useEffect(() => {
    const onResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <>
      <section
        id="home-gallery"
        ref={pinRef}
        aria-label="Galería interactiva"
        className="relative isolate w-full overflow-hidden bg-transparent"
      >
        <div
          ref={wrapRef}
          className="relative z-[1] flex h-svh w-full items-center overflow-hidden lg:h-[100svh]"
        >
          <div
            ref={trackRef}
            className="flex shrink-0 cursor-default items-center gap-6 pl-[clamp(1rem,7vw,14vw)] pr-[clamp(0.75rem,6vw,12vw)] will-change-transform sm:gap-8 sm:pl-[clamp(1.25rem,9vw,18vw)] sm:pr-[clamp(1rem,8vw,14vw)] lg:gap-10 lg:pl-[clamp(2rem,12vw,24vw)] lg:pr-[clamp(1.25rem,12vw,18vw)]"
          >
            <div
              ref={(el) => {
                slideRefs.current[0] = el
              }}
              className={GALLERY_SLIDE_FRAME_CLASS}
            >
              <div className="flex w-full justify-center px-0 py-0">
                <GalleryTextPill className={introPillClassName}>
                  <GalleryFlavorLabel
                    text={introContent ?? DEFAULT_GALLERY_INTRO_TEXT}
                  />
                </GalleryTextPill>
              </div>
            </div>

            {HOME_GALLERY_ITEMS.map((item, galleryIdx) => {
              const slideIdx = galleryIdx + 1
              return (
                <div
                  key={item.slug}
                  ref={(el) => {
                    slideRefs.current[slideIdx] = el
                  }}
                  className="shrink-0"
                >
                  <Link
                    to={`/project/${item.slug}`}
                    viewTransition
                    aria-label={`Ver proyecto ${item.slug}`}
                    className="block cursor-pointer border-0 bg-transparent p-0 outline-none ring-0 hover:scale-[1.02] transition-transform duration-300 ease-out"
                    onDragStart={(e) => e.preventDefault()}
                  >
                    <div
                      className={
                        'relative cursor-pointer overflow-hidden shadow-[inset_0_0_0_0.5px_rgba(240,237,228,0.1)] ' +
                        'after:pointer-events-none after:absolute after:inset-0 after:border after:border-solid after:border-[rgba(240,237,228,0.1)] ' +
                        'after:transition-colors after:duration-300 hover:after:border-[rgba(240,237,228,0.35)] ' +
                        'h-[clamp(340px,58svh,460px)] w-[clamp(240px,42vw,320px)] ' +
                        'sm:h-[clamp(380px,60svh,520px)] sm:w-[clamp(270px,45vw,380px)] ' +
                        'md:h-[clamp(420px,60svh,580px)] md:w-[clamp(300px,45vw,420px)] ' +
                        'lg:h-[clamp(340px,min(74svh,82vh),860px)] lg:w-[clamp(246px,min(82vw,calc(min(74svh,82vh)*0.75)),640px)] lg:max-w-[min(94vw,calc(min(74svh,82vh)*0.85))]'
                      }
                    >
                      <img
                        data-gallery-slide-img
                        src={item.src}
                        alt=""
                        draggable={false}
                        className="size-full object-cover [filter:saturate(0.9)_contrast(1.02)]"
                      />
                    </div>
                  </Link>
                </div>
              )
            })}

            <div
              ref={(el) => {
                slideRefs.current[HOME_GALLERY_ITEMS.length + 1] = el
              }}
              className={GALLERY_SLIDE_FRAME_CLASS}
            >
              <div className="flex w-full justify-center px-0 py-0">
                <GalleryTextPill className={outroPillClassName}>
                  <GalleryFlavorLabel
                    text={outroContent ?? DEFAULT_GALLERY_OUTRO_TEXT}
                  />
                </GalleryTextPill>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
