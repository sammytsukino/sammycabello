import {
  HOME_GALLERY_ITEMS,
} from '../data/homeGalleryItems.js'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

gsap.registerPlugin(ScrollTrigger, useGSAP)


function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n))
}

const ST_ID = 'home-gallery-horizontal'
const GALLERY_SLIDE_FRAME_CLASS =
  'relative flex h-[clamp(340px,min(74svh,82vh),860px)] w-[clamp(246px,min(82vw,calc(min(74svh,82vh)*0.75)),640px)] max-w-[min(94vw,calc(min(74svh,82vh)*0.85))] shrink-0 items-center justify-center overflow-hidden p-0'

const DEFAULT_GALLERY_INTRO_TEXT = 'a taste of my work →'
const DEFAULT_GALLERY_OUTRO_TEXT = 'hungry for more? ↴'
function GalleryTextPill({ children, className = '' }) {
  return (
    <span
      className={
        `box-border inline-flex max-w-[min(100%,calc(100%-0.5rem))] items-center justify-center ` +
        `px-[clamp(1rem,3.2vw,1.75rem)] py-[clamp(0.5rem,1.25vw,0.8rem)] ` +
        `text-center font-editorial text-[clamp(6.05rem,10.6vw,7.65rem)] font-medium lowercase ` +
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
  const focusLayerRef = useRef(null)
  const focusPosterRef = useRef(null)
  const focusImgRef = useRef(null)

  const flipAnimatingRef = useRef(false)
  const focusedSourceRef = useRef(null)
  const openingRectRef = useRef(null)
  const openFlipPendingRef = useRef(false)
  const focusOpenAnimKillRef = useRef(null)

  const [focusedIdx, setFocusedIdx] = useState(-1)
  const [focusImgReady, setFocusImgReady] = useState(false)
  const [focusOpenGen, setFocusOpenGen] = useState(0)

  const focusActive = focusedIdx >= 0

  const getMaxScrollX = useCallback(() => {
    const track = trackRef.current
    const wrap = wrapRef.current
    if (!track || !wrap) return 0
    return Math.max(0, track.scrollWidth - wrap.clientWidth)
  }, [])

  const offsetToCenterSlide = useCallback(
    (slideIdx) => {
      const slide = slideRefs.current[slideIdx]
      const wrap = wrapRef.current
      if (!slide || !wrap) return 0
      const max = getMaxScrollX()
      const center = slide.offsetLeft + slide.offsetWidth / 2
      return clamp(center - wrap.clientWidth / 2, 0, max)
    },
    [getMaxScrollX],
  )

  const scrollGalleryToOffsetX = useCallback(
    (targetX) => {
      const st = ScrollTrigger.getById(ST_ID)
      if (!st?.start || st.end == null) return
      const motion = Math.max(galleryMotionScrollPxRef.current, 1)
      const clamped = clamp(targetX, 0, motion)
      const y = st.start + clamped
      window.scrollTo({ top: y, behavior: 'smooth' })
    },
    [],
  )


  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => {
      ScrollTrigger.refresh()
    }
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
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
          end: () => `+=${motionScrollPx}`,
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

  useEffect(() => {
    if (focusedIdx < 0) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [focusedIdx])

  const closeFocus = useCallback(() => {
    focusOpenAnimKillRef.current?.()
    focusOpenAnimKillRef.current = null

    const focusEl = focusPosterRef.current
    const layer = focusLayerRef.current
    const source = focusedSourceRef.current

    if (layer) layer.scrollTop = 0

    if (focusEl) {
      focusEl.style.transition = 'none'
      focusEl.style.transform = ''
      focusEl.style.opacity = ''
      focusEl.style.transformOrigin = ''
      focusEl.style.width = ''
      void focusEl.offsetWidth
      focusEl.style.transition = ''
    }

    if (source?.isConnected) source.style.visibility = ''

    setFocusedIdx(-1)
    setFocusImgReady(false)
    focusedSourceRef.current = null
    openingRectRef.current = null
    openFlipPendingRef.current = false
    flipAnimatingRef.current = false

    requestAnimationFrame(() => {
      ScrollTrigger.update()
    })
  }, [])

  const openFocus = useCallback((idx) => {
    if (flipAnimatingRef.current) return
    const slide = slideRefs.current[idx]
    const poster = slide?.querySelector('[data-gallery-poster]')
    const sourceEl = poster instanceof HTMLElement ? poster : null
    if (!sourceEl) return

    const rect = sourceEl.getBoundingClientRect()
    openingRectRef.current = rect
    openFlipPendingRef.current = true
    focusedSourceRef.current = sourceEl

    flipAnimatingRef.current = true
    sourceEl.style.visibility = 'hidden'

    setFocusImgReady(false)
    setFocusedIdx(idx)
    setFocusOpenGen((g) => g + 1)
  }, [])

  useLayoutEffect(() => {
    if (
      focusedIdx < 0 ||
      !focusImgReady ||
      !openFlipPendingRef.current
    )
      return

    openFlipPendingRef.current = false
    const first = openingRectRef.current
    const focusEl = focusPosterRef.current
    const source = focusedSourceRef.current
    if (!first || !focusEl || !source) {
      flipAnimatingRef.current = false
      return
    }

    focusEl.style.transition = 'none'
    focusEl.style.opacity = '1'
    focusEl.style.transform = 'scale(1)'
    void focusEl.offsetWidth

    const last = focusEl.getBoundingClientRect()
    const dx =
      first.left + first.width / 2 - (last.left + last.width / 2)
    const dy =
      first.top + first.height / 2 - (last.top + last.height / 2)
    const s = first.width / last.width

    focusEl.style.transformOrigin = 'center center'
    focusEl.style.transform = `translate(${dx}px, ${dy}px) scale(${s})`
    void focusEl.offsetWidth
    focusEl.style.transition =
      'transform 1.05s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1)'
    focusEl.style.transform = ''

    let tid = 0
    let finished = false
    const kill = () => {
      if (finished) return
      finished = true
      window.clearTimeout(tid)
      focusEl.removeEventListener('transitionend', fe)
      focusEl.style.transition = 'none'
      focusEl.style.transform = ''
      focusEl.style.opacity = ''
      focusEl.style.transformOrigin = ''
      void focusEl.offsetWidth
      focusEl.style.transition = ''
      flipAnimatingRef.current = false
      if (focusOpenAnimKillRef.current === kill)
        focusOpenAnimKillRef.current = null
    }
    const fe = (e) => {
      if (e.propertyName === 'transform') kill()
    }
    focusOpenAnimKillRef.current = kill
    focusEl.addEventListener('transitionend', fe)
    tid = window.setTimeout(kill, 1240)

    openingRectRef.current = null
    return () => {
      focusOpenAnimKillRef.current?.()
      focusOpenAnimKillRef.current = null
    }
  }, [focusImgReady, focusOpenGen, focusedIdx])

  const goToPieceInGallery = useCallback(() => {
    if (focusedIdx < 0) return
    scrollGalleryToOffsetX(offsetToCenterSlide(focusedIdx + 1))
    closeFocus()
  }, [
    closeFocus,
    focusedIdx,
    offsetToCenterSlide,
    scrollGalleryToOffsetX,
  ])

  useEffect(() => {
    const onKey = (e) => {
      if (focusedIdx < 0) return
      if (e.key !== 'Escape') return
      e.preventDefault()
      closeFocus()
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [closeFocus, focusedIdx])

  return (
    <>
      <section
        id="home-gallery"
        ref={pinRef}
        aria-label="Galería interactiva"
        className="relative isolate w-full overflow-hidden bg-portfolio-bg"
      >


        <div
          ref={wrapRef}
          className="relative z-[1] flex h-[100svh] w-full items-center overflow-hidden"
        >
          <div
            ref={trackRef}
            className="flex shrink-0 cursor-default items-center gap-10 pl-[clamp(2rem,12vw,24vw)] pr-[clamp(1.25rem,12vw,18vw)] will-change-transform"
          >
            <div
              ref={(el) => {
                slideRefs.current[0] = el
              }}
              className={GALLERY_SLIDE_FRAME_CLASS}
            >
              <div className="flex w-full justify-center px-0 py-0">
                <GalleryTextPill className={introPillClassName}>
                  {introContent ?? DEFAULT_GALLERY_INTRO_TEXT}
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
                  <button
                    type="button"
                    aria-label={`Ampliar pieza ${galleryIdx + 1}`}
                    disabled={focusActive}
                    className="block cursor-pointer border-0 bg-transparent p-0 outline-none ring-0 disabled:pointer-events-none disabled:cursor-default"
                    onClick={(e) => {
                      e.stopPropagation()
                      openFocus(galleryIdx)
                    }}
                    onDragStart={(e) => e.preventDefault()}
                  >
                    <div
                      data-gallery-poster
                      className="relative h-[clamp(340px,min(74svh,82vh),860px)] w-[clamp(246px,min(82vw,calc(min(74svh,82vh)*0.75)),640px)] max-w-[min(94vw,calc(min(74svh,82vh)*0.85))] cursor-pointer overflow-hidden shadow-[inset_0_0_0_0.5px_rgba(240,237,228,0.1)] after:pointer-events-none after:absolute after:inset-0 after:border after:border-solid after:border-[rgba(240,237,228,0.1)] after:transition-colors after:duration-300 hover:after:border-[rgba(240,237,228,0.35)]"
                    >
                      <img
                        data-gallery-slide-img
                        src={item.src}
                        alt=""
                        draggable={false}
                        className="size-full object-cover [filter:saturate(0.9)_contrast(1.02)]"
                      />
                    </div>
                  </button>
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
                  {outroContent ?? DEFAULT_GALLERY_OUTRO_TEXT}
                </GalleryTextPill>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        ref={focusLayerRef}
        className={
          `fixed inset-0 z-[220] flex flex-col items-center justify-center overflow-hidden ` +
          (focusActive
            ? 'pointer-events-auto visible bg-[rgba(10,9,8,0.72)] opacity-100 backdrop-blur-[12px]'
            : 'pointer-events-none invisible opacity-0 backdrop-blur-none')
        }
        aria-hidden={!focusActive}
        onClick={(e) => {
          if (e.target === focusLayerRef.current) closeFocus()
        }}
      >
        {focusActive ? (
          <>
            <div className="pointer-events-none fixed inset-x-0 top-[4.75rem] z-[230] flex justify-end px-8 md:right-0 md:top-[5.5rem] md:px-10">
              <button
                type="button"
                aria-label="Cerrar"
                className="pointer-events-auto flex size-11 cursor-pointer items-center justify-center border border-[rgba(240,237,228,0.35)] bg-transparent text-[#f0ede4] transition-colors hover:bg-[rgba(240,237,228,0.1)]"
                onClick={(e) => {
                  e.stopPropagation()
                  closeFocus()
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="pointer-events-none fixed inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-[230] flex justify-end px-8 md:bottom-10 md:px-10">
              <button
                type="button"
                className="pointer-events-auto max-w-[calc(100vw-4rem)] cursor-pointer border border-[rgba(240,237,228,0.25)] px-5 py-3 text-center font-mono text-[10px] uppercase leading-tight tracking-[0.16em] text-[#f0ede4] transition-colors hover:bg-[rgba(240,237,228,0.08)] md:max-w-[min(20rem,calc(100vw-5rem))]"
                onClick={(e) => {
                  e.stopPropagation()
                  goToPieceInGallery()
                }}
              >
                Ir a esta pieza en la galería
              </button>
            </div>

            <div
              ref={focusPosterRef}
              className="relative z-[221] shrink-0 overflow-hidden"
              style={{
                opacity: focusActive ? 1 : 0,
                width: 'min(calc(85vh * 3 / 4), 92vw)',
                aspectRatio: '3 / 4',
              }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 border border-[rgba(240,237,228,0.2)] shadow-[inset_0_0_0_0.5px_rgba(240,237,228,0.08)]"
              />
              <img
                key={focusOpenGen}
                ref={focusImgRef}
                src={
                  focusedIdx >= 0
                    ? (HOME_GALLERY_ITEMS[focusedIdx]?.src ?? '')
                    : ''
                }
                alt=""
                draggable={false}
                onLoad={() => {
                  if (openFlipPendingRef.current) setFocusImgReady(true)
                }}
                className="pointer-events-none block size-full object-cover"
              />
            </div>
          </>
        ) : null}
      </div>

    </>
  )
}
