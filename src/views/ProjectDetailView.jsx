import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { HOME_GALLERY_ITEMS } from '../data/homeGalleryItems'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { formatStackLabel, getProjectTitle } from '../lib/projectLabels.js'
import StackIcon from 'tech-stack-icons'
import Lenis from 'lenis'

const LOGO_OUTLINE_SRC =
  'https://res.cloudinary.com/dsy30p7gf/image/upload/v1778581336/Recurso_12estrellarellena_matdlv.svg'
const LOGO_FILLED_SRC =
  'https://res.cloudinary.com/dsy30p7gf/image/upload/v1778581291/Recurso_11estrellarellena_aoc12t.svg'

function MediaRenderer({ src, alt, className, onMediaLoad, controls = false }) {
  if (!src) return null
  const isVideo = src.match(/\.(mp4|webm|ogg)$/i) || src.includes('/video/upload/')
  const label = alt || 'Medio del proyecto'

  if (isVideo) {
    return (
      <video
        src={src}
        className={className}
        aria-label={label}
        autoPlay={!controls}
        loop
        muted={!controls}
        playsInline
        controls={controls}
        onLoadedMetadata={onMediaLoad}
        onLoadedData={onMediaLoad}
      />
    )
  }

  return <img src={src} alt={alt ?? ''} className={className} onLoad={onMediaLoad} />
}

const CORNER_ICON_SIZE =
  `size-[2.2rem] md:size-[2.65rem] lg:size-[3.1rem] shrink-0 ` +
  `desktop-std:lg:size-[2.75rem]`

const GALLERY_VARIANTS = [
  [
    "h-[60vh] self-center z-10",
    "h-[30vh] self-start mt-[10vh] -ml-[10vw] z-20 shadow-2xl",
    "h-[50vh] self-center z-10",
    "h-[70vh] self-end mb-[5vh] z-10",
    "h-[40vh] self-center -ml-[8vw] z-30 shadow-2xl",
    "h-[65vh] self-center z-10",
    "h-[25vh] self-end mb-[15vh] -ml-[5vw] z-20 shadow-2xl",
    "h-[50vh] self-center z-10"
  ],
  [
    "h-[50vh] self-start mt-[5vh] z-10",
    "h-[40vh] self-end mb-[10vh] -ml-[15vw] z-20 shadow-2xl",
    "h-[65vh] self-center z-10",
    "h-[30vh] self-start mt-[15vh] -ml-[5vw] z-30 shadow-2xl",
    "h-[70vh] self-center z-10",
    "h-[45vh] self-end mb-[5vh] -ml-[10vw] z-20 shadow-2xl",
    "h-[60vh] self-start mt-[10vh] z-10",
    "h-[35vh] self-center -ml-[8vw] z-20 shadow-2xl"
  ],
  [
    "h-[40vh] self-end mb-[10vh] z-10",
    "h-[60vh] self-center -ml-[10vw] z-20 shadow-2xl",
    "h-[35vh] self-start mt-[10vh] -ml-[5vw] z-10",
    "h-[75vh] self-center z-30 shadow-2xl",
    "h-[30vh] self-end mb-[15vh] -ml-[8vw] z-20",
    "h-[50vh] self-start mt-[5vh] z-10",
    "h-[45vh] self-center -ml-[10vw] z-20 shadow-2xl",
    "h-[65vh] self-end mb-[5vh] z-10"
  ],
  [
    "h-[55vh] self-center z-10",
    "h-[45vh] self-start mt-[5vh] -ml-[6vw] z-20 shadow-2xl",
    "h-[30vh] self-end mb-[12vh] -ml-[4vw] z-10",
    "h-[65vh] self-center z-10",
    "h-[35vh] self-center -ml-[10vw] z-30 shadow-2xl",
    "h-[50vh] self-end mb-[8vh] z-10",
    "h-[40vh] self-start mt-[15vh] -ml-[8vw] z-20 shadow-2xl",
    "h-[60vh] self-center z-10"
  ],
  [
    "h-[35vh] self-start mt-[12vh] z-10",
    "h-[65vh] self-center -ml-[8vw] z-20 shadow-2xl",
    "h-[45vh] self-end mb-[5vh] z-10",
    "h-[55vh] self-start mt-[8vh] -ml-[12vw] z-30 shadow-2xl",
    "h-[30vh] self-center -ml-[4vw] z-10",
    "h-[70vh] self-end mb-[10vh] z-20 shadow-2xl",
    "h-[40vh] self-center -ml-[6vw] z-10",
    "h-[50vh] self-start mt-[15vh] z-30 shadow-2xl"
  ],
  [
    "h-[65vh] self-end mb-[8vh] z-10",
    "h-[35vh] self-start mt-[15vh] -ml-[12vw] z-30 shadow-2xl",
    "h-[55vh] self-center z-10",
    "h-[45vh] self-center -ml-[8vw] z-20 shadow-2xl",
    "h-[60vh] self-start mt-[5vh] z-10",
    "h-[30vh] self-end mb-[10vh] -ml-[10vw] z-30 shadow-2xl",
    "h-[50vh] self-center z-10",
    "h-[40vh] self-end mb-[5vh] -ml-[6vw] z-20 shadow-2xl"
  ],
  [
    "h-[45vh] self-center z-10",
    "h-[55vh] self-start mt-[10vh] -ml-[5vw] z-20 shadow-2xl",
    "h-[65vh] self-end mb-[12vh] -ml-[10vw] z-30 shadow-2xl",
    "h-[30vh] self-center z-10",
    "h-[50vh] self-start mt-[5vh] -ml-[8vw] z-20",
    "h-[40vh] self-end mb-[5vh] z-10",
    "h-[60vh] self-center -ml-[6vw] z-30 shadow-2xl",
    "h-[35vh] self-start mt-[15vh] z-10"
  ],
  [
    "h-[70vh] self-center z-10",
    "h-[30vh] self-end mb-[15vh] -ml-[10vw] z-20 shadow-2xl",
    "h-[50vh] self-start mt-[10vh] z-10",
    "h-[40vh] self-center -ml-[8vw] z-30 shadow-2xl",
    "h-[65vh] self-end mb-[5vh] z-10",
    "h-[35vh] self-start mt-[5vh] -ml-[6vw] z-20 shadow-2xl",
    "h-[55vh] self-center z-10",
    "h-[45vh] self-center -ml-[10vw] z-20 shadow-2xl"
  ]
]

export function ProjectDetailView() {
  const { slug } = useParams()
  const project = HOME_GALLERY_ITEMS.find((p) => p.slug === slug) || HOME_GALLERY_ITEMS[0]
  const projectTitle = getProjectTitle(project.slug)

  useDocumentTitle(projectTitle)

  const galleryRef = useRef(null)
  const lenisRef = useRef(null)
  const closeButtonRef = useRef(null)
  const lightboxTriggerRef = useRef(null)

  const [activePara, setActivePara] = useState(0)
  const wheelTimeout = useRef(null)

  useEffect(() => {
    const gallery = galleryRef.current
    if (!gallery) return

    const lenis = new Lenis({
      wrapper: gallery,
      content: gallery.firstElementChild,
      orientation: 'horizontal',
      gestureOrientation: 'both',
      smoothWheel: true,
      wheelMultiplier: 1.2
    })
    
    lenisRef.current = lenis

    const ro = new ResizeObserver(() => {
      lenis.resize()
    })
    if (gallery.firstElementChild) {
      ro.observe(gallery.firstElementChild)
    }

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const handleMediaLoad = () => {
    if (lenisRef.current) {
      lenisRef.current.resize()
    }
  }

  const projectIndex = HOME_GALLERY_ITEMS.findIndex((p) => p.slug === slug)
  const layoutVariant = GALLERY_VARIANTS[projectIndex >= 0 ? projectIndex % GALLERY_VARIANTS.length : 0]

  const paragraphs = project?.paragraphs || [
    "Este proyecto nace de la necesidad de explorar nuevas interacciones usando CSS moderno y React. Mezcla animaciones de alto rendimiento con una estética minimalista y limpia.",
    "El mayor reto fue gestionar el estado a través de diferentes tamaños de pantalla preservando un frame rate suave para la galería horizontal y el cambio de texto.",
    "Aprovechando las transiciones de estado de React, logramos un diseño resiliente que se adapta de manera fluida y elegante.",
    "Por último, la arquitectura permite escalar añadiendo nuevos elementos al portfolio manteniendo un lenguaje visual cohesivo."
  ]

  const galleryMedia = project?.gallery || [
    HOME_GALLERY_ITEMS[0].src,
    HOME_GALLERY_ITEMS[1].src,
    HOME_GALLERY_ITEMS[2].src,
    HOME_GALLERY_ITEMS[3].src,
    HOME_GALLERY_ITEMS[4].src,
    HOME_GALLERY_ITEMS[5].src,
    HOME_GALLERY_ITEMS[6].src,
    HOME_GALLERY_ITEMS[7].src
  ]

  const stackLogos = project?.stack || []

  const handleTextWheel = (e) => {
    if (wheelTimeout.current) return
    
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
    
    if (delta > 0) {
      setActivePara((prev) => Math.min(prev + 1, paragraphs.length - 1))
    } else if (delta < 0) {
      setActivePara((prev) => Math.max(prev - 1, 0))
    }
    
    wheelTimeout.current = setTimeout(() => {
      wheelTimeout.current = null
    }, 600)
  }

  const [lightbox, setLightbox] = useState({ src: null, visible: false, label: '' })

  const openLightbox = (src, label, triggerEl = null) => {
    lightboxTriggerRef.current = triggerEl
    setLightbox({ src, visible: false, label })
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setLightbox({ src, visible: true, label })
      })
    })
  }

  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, visible: false }))
    setTimeout(() => {
      setLightbox({ src: null, visible: false, label: '' })
    }, 400)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox()
      }
    }

    if (lightbox.src) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
      const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0)
      return () => {
        window.clearTimeout(focusTimer)
        document.body.style.overflow = 'auto'
        window.removeEventListener('keydown', handleKeyDown)
        lightboxTriggerRef.current?.focus?.()
      }
    }

    document.body.style.overflow = 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [lightbox.src])

  const handleParagraphKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setActivePara((prev) => (prev + 1) % paragraphs.length)
    }
  }

  return (
    <main
      id="main-content"
      className="min-h-[100svh] w-full overflow-x-hidden md:overflow-hidden flex flex-col bg-[var(--color-portfolio-bg)] text-black relative"
    >
      <h1 className="sr-only">{projectTitle}</h1>

      <Link
        to="/"
        viewTransition
        aria-label="Volver al inicio"
        className="fixed top-[calc(var(--hero-frame-inset)+env(safe-area-inset-top,0px))] left-[var(--hero-frame-inset)] z-[100] block group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portfolio-lime"
      >
        <span className={`relative flex cursor-pointer items-start justify-center ${CORNER_ICON_SIZE}`} aria-hidden>
          <img
            src={LOGO_FILLED_SRC}
            alt=""
            draggable={false}
            className="size-full object-contain transition-[filter] duration-200 ease-out"
            style={{ filter: 'invert(1) brightness(2)' }}
            onMouseEnter={e => { e.currentTarget.style.filter = 'invert(48%) sepia(95%) saturate(500%) hue-rotate(90deg) brightness(1.1)' }}
            onMouseLeave={e => { e.currentTarget.style.filter = 'invert(1) brightness(2)' }}
          />
        </span>
      </Link>

      <div className="fixed top-[calc(var(--hero-frame-inset)+env(safe-area-inset-top,0px))] right-[var(--hero-frame-inset)] z-[100] flex items-center gap-2 md:gap-4">
        {project?.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Ver demo en vivo (se abre en una nueva pestaña)"
            className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portfolio-lime"
          >
            <span className={`relative flex cursor-pointer items-start justify-center ${CORNER_ICON_SIZE}`} aria-hidden>
              <img
                src="https://res.cloudinary.com/dsy30p7gf/image/upload/v1778924434/Recurso_17live_kky9aj.svg"
                alt=""
                draggable={false}
                className="size-full object-contain transition-[filter] duration-200 ease-out"
                style={{ filter: 'invert(1) brightness(2)' }}
                onMouseEnter={e => { e.currentTarget.style.filter = 'invert(48%) sepia(95%) saturate(500%) hue-rotate(90deg) brightness(1.1)' }}
                onMouseLeave={e => { e.currentTarget.style.filter = 'invert(1) brightness(2)' }}
              />
            </span>
          </a>
        )}

        {project?.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Ver repositorio en GitHub (se abre en una nueva pestaña)"
            className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portfolio-lime"
          >
            <span className={`relative flex cursor-pointer items-start justify-center ${CORNER_ICON_SIZE}`} aria-hidden>
              <img
                src="https://res.cloudinary.com/dsy30p7gf/image/upload/v1778924333/Recurso_15github_ukakji.svg"
                alt=""
                draggable={false}
                className="size-full object-contain transition-[filter] duration-200 ease-out"
                style={{ filter: 'invert(1) brightness(2)' }}
                onMouseEnter={e => { e.currentTarget.style.filter = 'invert(48%) sepia(95%) saturate(500%) hue-rotate(90deg) brightness(1.1)' }}
                onMouseLeave={e => { e.currentTarget.style.filter = 'invert(1) brightness(2)' }}
              />
            </span>
          </a>
        )}
      </div>

      <section
        ref={galleryRef}
        aria-label={`Galería de medios de ${projectTitle}`}
        className="h-[60svh] md:h-[80svh] shrink-0 w-full overflow-x-auto overflow-y-hidden bg-[#111] text-white"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style dangerouslySetInnerHTML={{__html: `
          section::-webkit-scrollbar { display: none; }
        `}} />
        <div className="h-full flex items-center gap-16 w-max relative before:content-[''] before:w-[var(--hero-frame-inset)] before:shrink-0 after:content-[''] after:w-[var(--hero-frame-inset)] after:shrink-0">
          
          {layoutVariant.map((cssClass, i) => (
            galleryMedia[i] ? (
              <button
                key={i}
                type="button"
                className={`flex-shrink-0 w-max relative cursor-pointer border-0 bg-transparent p-0 ${cssClass} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portfolio-lime`}
                aria-label={`Ampliar medio ${i + 1} de ${projectTitle}`}
                onClick={(e) =>
                  openLightbox(
                    galleryMedia[i],
                    `${projectTitle}, medio ${i + 1}`,
                    e.currentTarget,
                  )
                }
              >
                <MediaRenderer
                  src={galleryMedia[i]}
                  alt=""
                  onMediaLoad={handleMediaLoad}
                  className="h-full w-auto max-w-none object-contain block pointer-events-none"
                />
              </button>
            ) : (
              <div key={i} className={`flex-shrink-0 w-max relative ${cssClass}`} aria-hidden />
            )
          ))}

        </div>
      </section>

      <section
        aria-label={`Información de ${projectTitle}`}
        className="h-[40svh] md:h-[20svh] shrink-0 w-full flex flex-col md:flex-row bg-[var(--color-portfolio-bg)] px-[var(--hero-frame-inset)] pb-[calc(var(--hero-frame-inset)+env(safe-area-inset-bottom,0px))] gap-4 md:gap-0 pt-4 md:pt-0"
      >
        <div
          className="w-full md:w-2/3 h-full flex flex-col justify-end relative overflow-hidden"
          onWheel={handleTextWheel}
          data-lenis-prevent="true"
        >
          <div
            role="region"
            aria-label="Descripción del proyecto"
            aria-live="polite"
            aria-atomic="true"
            tabIndex={0}
            className="relative w-full h-[calc(100%-1.5rem)] pr-0 md:pr-8 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portfolio-lime"
            onClick={() => setActivePara((prev) => (prev + 1) % paragraphs.length)}
            onKeyDown={handleParagraphKeyDown}
          >
            {paragraphs.map((p, i) => (
              <div 
                key={i} 
                className={`absolute inset-0 flex items-end transition-all ease-[cubic-bezier(0.33,1,0.68,1)] ${
                  activePara === i 
                    ? 'opacity-100 translate-x-0 pointer-events-auto duration-500 delay-300' 
                    : activePara > i 
                      ? 'opacity-0 -translate-x-12 pointer-events-none duration-300'
                      : 'opacity-0 translate-x-12 pointer-events-none duration-300'
                }`}
              >
                <p className="text-[clamp(0.875rem,1.8vw,1.25rem)] font-editorial-new leading-relaxed m-0 select-none pb-2 desktop-std:text-[clamp(0.8rem,1.55vw,1.1rem)]">
                  {p}
                </p>
              </div>
            ))}
          </div>

          <div
            className="flex gap-2 items-center h-4 shrink-0 mt-1"
            role="tablist"
            aria-label="Párrafos del proyecto"
          >
            {paragraphs.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-label={`Ir al párrafo ${i + 1}`}
                aria-selected={activePara === i}
                aria-current={activePara === i ? 'true' : undefined}
                onClick={() => setActivePara(i)}
                className={`h-[4px] rounded-full transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portfolio-lime ${
                  activePara === i ? 'w-6 bg-portfolio-lime' : 'w-1.5 bg-black hover:bg-black/40'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/3 flex-none md:h-full flex flex-col justify-end items-start md:items-end mt-4 md:mt-0">
          <div
            className="grid gap-3 w-max"
            dir="rtl"
            role="list"
            aria-label="Tecnologías utilizadas"
            style={{ gridTemplateColumns: `repeat(${Math.ceil((stackLogos.length || 8) / 2)}, minmax(0, 1fr))` }}
          >
            {stackLogos.length > 0 ? (
              stackLogos.map((iconName, i) => (
                <div
                  key={i}
                  role="listitem"
                  aria-label={formatStackLabel(iconName)}
                  className="size-[2rem] md:size-[clamp(1.5rem,3vw,2rem)] flex items-center justify-center p-[2px] transition-all duration-300 grayscale hover:grayscale-0"
                >
                  <StackIcon name={iconName} className="w-full h-full" aria-hidden />
                </div>
              ))
            ) : (
              [...Array(8)].map((_, i) => (
                <div key={i} className="size-[2rem] md:size-[clamp(1.5rem,3vw,2rem)] rounded-full bg-black/10 flex items-center justify-center transition-colors hover:bg-black/20 cursor-pointer">
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {lightbox.src && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.label ? `Vista ampliada: ${lightbox.label}` : 'Vista ampliada'}
          className={`fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 md:p-12 cursor-zoom-out transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${lightbox.visible ? 'opacity-100 backdrop-blur-sm' : 'opacity-0 backdrop-blur-none'}`}
          onClick={closeLightbox}
        >
          <div className={`relative max-w-full max-h-full flex items-center justify-center cursor-default transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${lightbox.visible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4 opacity-0'}`} onClick={e => e.stopPropagation()}>
            <MediaRenderer
              src={lightbox.src}
              alt={lightbox.label || `Vista ampliada de ${projectTitle}`}
              className="max-w-full max-h-[90vh] object-contain rounded shadow-2xl"
              controls={false}
            />
            <button
              ref={closeButtonRef}
              type="button"
              className="absolute top-4 right-4 md:-right-12 md:top-0 size-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              onClick={closeLightbox}
              aria-label="Cerrar vista ampliada"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
