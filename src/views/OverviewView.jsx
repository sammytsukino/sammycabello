import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import NameDisplay from '../components/NameDisplay.jsx'
import { HOME_GALLERY_ITEMS } from '../data/homeGalleryItems.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import { getProjectTitle } from '../lib/projectLabels.js'

const OVERVIEW_STAR_OUTLINE_SRC =
  'https://res.cloudinary.com/dsy30p7gf/image/upload/v1778581291/Recurso_11estrellarellena_aoc12t.svg'

const CATEGORY_DETAILS = {
  'web-stuff': {
    title: 'Web Stuff',
    subtitle: '1.1 WEB STUFF',
    version: 'v1.1',
    footerText: '"DELICIOUS VISUALS, ROBUST RECIPES"',
    filter: () => true,
  },
  'art-design': {
    title: 'Art & Design',
    subtitle: '2.2 ART & DESIGN',
    version: 'v2.2',
    footerText: '"EDITORIAL GRAPHIC DESIGN & INTERACTIVE ARTWORK"',
    filter: (item) =>
      item.stack.some((tech) =>
        [
          'figma',
          'adobeillustrator',
          'adobeaftereffects',
          'threejs',
          'p5js',
          'postcss',
          'tailwindcss',
        ].includes(tech),
      ),
  },
  'comms-pr': {
    title: 'Comms & PR',
    subtitle: '3.3 COMMUNICATION & PR',
    version: 'v3.3',
    footerText: '"COMMUNICATION STRATEGY & NARRATIVE EXPERIENCES"',
    filter: (item) =>
      item.slug === 'xplorer' ||
      item.stack.some((tech) =>
        ['figma', 'adobeillustrator', 'adobeaftereffects'].includes(tech),
      ) ||
      item.paragraphs.some(
        (p) =>
          p.toLowerCase().includes('communication') ||
          p.toLowerCase().includes('brand') ||
          p.toLowerCase().includes('narrative') ||
          p.toLowerCase().includes('marketing'),
      ),
  },
}

export function OverviewView() {
  const { category = 'web-stuff' } = useParams()
  const activeCategory = CATEGORY_DETAILS[category] || CATEGORY_DETAILS['web-stuff']

  useDocumentTitle(`Overview · ${activeCategory.title}`)

  const filteredItems = useMemo(() => {
    return HOME_GALLERY_ITEMS.filter(activeCategory.filter)
  }, [activeCategory])

  const slotAssignments = useMemo(() => {
    const availableSlots = Array.from({ length: 30 }, (_, i) => i + 1)
    
    for (let i = availableSlots.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableSlots[i], availableSlots[j]] = [availableSlots[j], availableSlots[i]]
    }

    const assignments = new Map()
    filteredItems.forEach((item, index) => {
      if (index < 30) {
        assignments.set(availableSlots[index], item)
      }
    })
    
    return assignments
  }, [filteredItems])

  const gradientClass = useMemo(() => {
    const isPink = Math.random() < 0.5
    return isPink 
      ? 'bg-gradient-to-b from-portfolio-bg to-portfolio-pink' 
      : 'bg-gradient-to-b from-portfolio-bg to-portfolio-lime'
  }, [])

  return (
    <main
      id="main-content"
      className={`min-h-svh w-full overflow-x-hidden ${gradientClass} text-black md:h-svh md:overflow-hidden`}
    >
      <section
        aria-label="Cabecera del overview"
        className="flex h-[5vh] min-h-11 items-center border-b border-black/35 px-site-x lg:px-10"
      >
        <Link
          to="/"
          viewTransition
          aria-label="Volver al inicio"
          className="relative h-9 w-[11.9rem] flex-none overflow-visible sm:w-[12rem] md:h-6 md:w-[24rem] block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950/45"
        >
          <div className="absolute left-0 top-1/2 origin-left -translate-y-1/2 scale-[0.64] sm:scale-[0.46] md:scale-[0.56]">
            <NameDisplay trigger="auto" autoIntervalMs={800} />
          </div>
        </Link>
        <div className="ml-2 hidden text-[0.56rem] uppercase tracking-[0.12em] sm:block md:ml-4 md:text-[0.65rem] md:tracking-[0.14em]">
          PORTFOLIO
          <br />
          OVERVIEW
        </div>
        <div className="ml-3 text-[0.56rem] uppercase tracking-[0.12em] md:ml-8 md:text-[0.65rem] md:tracking-[0.14em]">
          {activeCategory.version}
          <br />
          2026
        </div>
        <h1 className="m-0 ml-auto text-[0.62rem] uppercase tracking-[0.12em] sm:text-[0.72rem] md:text-[0.8rem] md:tracking-[0.14em]">
          {activeCategory.subtitle}
        </h1>
        <div className="ml-3 flex shrink-0 items-center sm:ml-5 md:ml-8">
          <img
            src={OVERVIEW_STAR_OUTLINE_SRC}
            alt=""
            width={18}
            height={18}
            draggable={false}
            className="size-[0.72rem] object-contain sm:size-[0.8rem] md:size-[0.9rem]"
            aria-hidden
          />
        </div>
      </section>

      <section
        aria-label={`Proyectos de ${activeCategory.title}`}
        className="min-h-[108vh] px-site-x pb-4 pt-3 md:h-[75vh] md:min-h-0 lg:px-10"
      >
        <div className="grid grid-cols-3 grid-rows-[repeat(10,minmax(6.2rem,auto))] gap-x-2 gap-y-4 sm:gap-x-3 sm:gap-y-6 md:h-full md:grid-cols-10 md:grid-rows-3 md:gap-y-8">
          {Array.from({ length: 30 }, (_, idx) => {
            const slotId = idx + 1
            const item = slotAssignments.get(slotId)

            return (
              <div key={slotId}>
                <p className="mb-1 text-[0.48rem] tracking-[0.1em] text-black/80 sm:text-[0.52rem] sm:tracking-[0.12em]">
                  [{String(slotId).padStart(2, '0')}]
                </p>
                {item ? (
                  <Link
                    to={`/project/${item.slug}`}
                    viewTransition
                    aria-label={`Ver proyecto ${getProjectTitle(item.slug)}`}
                    className="block overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950/45"
                    style={{
                      width: 'min(100%, 7.5rem)',
                      height: 'clamp(2.4rem, 6.8vw, 6rem)',
                    }}
                  >
                    <img
                      src={item.src}
                      alt=""
                      className="size-full object-cover [filter:saturate(0.9)_contrast(1.02)]"
                      draggable={false}
                    />
                  </Link>
                ) : null}
              </div>
            )
          })}
        </div>
      </section>

      <footer className="flex h-[20vh] min-h-24 items-end justify-center px-site-x pb-3 lg:px-10 lg:pb-6">
        <p className="max-w-[24ch] text-center font-editorial text-[clamp(1.4rem,7.2vw,3rem)] uppercase leading-[0.95] tracking-[0.02em] md:max-w-none md:whitespace-nowrap md:text-[4.3rem]">
          {activeCategory.footerText}
        </p>
      </footer>
    </main>
  )
}
