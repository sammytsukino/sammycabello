import { useCallback, useLayoutEffect, useRef, useState } from 'react'

const PACMAN_SRC =
  'https://res.cloudinary.com/dqgiuadyw/image/upload/v1779611032/pacman-5_iyib4c.svg'

const PACMAN_PINK_FILTER =
  'invert(52%) sepia(98%) saturate(4200%) hue-rotate(295deg) brightness(1.05) contrast(1.02)'

const FOOD_SEQUENCE = [
  'https://res.cloudinary.com/dqgiuadyw/image/upload/v1779611032/pacman-0_b0dvg4.svg',
  'https://res.cloudinary.com/dqgiuadyw/image/upload/v1779611032/pacman-3_gsfvgm.svg',
  'https://res.cloudinary.com/dqgiuadyw/image/upload/v1779611032/pacman-1_wzytol.svg',
  'https://res.cloudinary.com/dqgiuadyw/image/upload/v1779611032/pacman-2_vqs0ok.svg',
  'https://res.cloudinary.com/dqgiuadyw/image/upload/v1779611032/pacman-4_xjkrxd.svg',
]

function foodSrcForIndex(index) {
  return FOOD_SEQUENCE[index % FOOD_SEQUENCE.length]
}

export function stepParagraphIndex(key, activeIndex, count) {
  if (key === 'ArrowRight' || key === 'ArrowDown') {
    return Math.min(activeIndex + 1, count - 1)
  }
  if (key === 'ArrowLeft' || key === 'ArrowUp') {
    return Math.max(activeIndex - 1, 0)
  }
  return activeIndex
}

export function isParagraphArrowKey(key) {
  return key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key === 'ArrowDown'
}

export function PacManParagraphCounter({ count, activeIndex, onSelect }) {
  const trackRef = useRef(null)
  const slotRefs = useRef([])
  const [pacmanLeft, setPacmanLeft] = useState(0)
  const atLastSlide = activeIndex >= count - 1

  const syncPacmanPosition = useCallback(() => {
    const track = trackRef.current
    const slot = slotRefs.current[activeIndex]
    if (!track || !slot) return
    const trackRect = track.getBoundingClientRect()
    const slotRect = slot.getBoundingClientRect()
    setPacmanLeft(slotRect.left - trackRect.left + slotRect.width / 2)
  }, [activeIndex])

  useLayoutEffect(() => {
    syncPacmanPosition()
    const track = trackRef.current
    if (!track) return undefined

    const observer = new ResizeObserver(syncPacmanPosition)
    observer.observe(track)
    window.addEventListener('resize', syncPacmanPosition)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', syncPacmanPosition)
    }
  }, [syncPacmanPosition, count])

  if (count <= 1) return null

  const handleTrackKeyDown = (e) => {
    if (!isParagraphArrowKey(e.key)) return
    e.preventDefault()
    e.stopPropagation()
    const next = stepParagraphIndex(e.key, activeIndex, count)
    if (next !== activeIndex) onSelect(next)
  }

  const handleTrailingAction = () => {
    if (atLastSlide) {
      onSelect(0)
      return
    }
    onSelect(activeIndex + 1)
  }

  return (
    <div
      ref={trackRef}
      className="relative mt-2 flex h-10 shrink-0 items-end gap-3 md:h-11 md:gap-3.5"
      role="tablist"
      aria-label="Párrafos del proyecto"
      onKeyDown={handleTrackKeyDown}
    >
      {Array.from({ length: count }, (_, i) => {
        const isEaten = i < activeIndex
        const isCurrent = i === activeIndex

        return (
          <button
            key={i}
            ref={(node) => {
              slotRefs.current[i] = node
            }}
            type="button"
            role="tab"
            aria-label={`Ir al párrafo ${i + 1}`}
            aria-selected={isCurrent}
            aria-current={isCurrent ? 'true' : undefined}
            onClick={() => onSelect(i)}
            className={
              `relative flex size-9 shrink-0 items-center justify-center border-0 bg-transparent p-0 ` +
              `md:size-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ` +
              `focus-visible:outline-portfolio-lime`
            }
          >
            {!isCurrent ? (
              <img
                src={foodSrcForIndex(i)}
                alt=""
                draggable={false}
                aria-hidden
                className={
                  `size-7 object-contain transition-opacity duration-300 md:size-8 ` +
                  `${isEaten ? 'opacity-20' : 'opacity-100'}`
                }
              />
            ) : null}
          </button>
        )
      })}

      <button
        type="button"
        aria-label={atLastSlide ? 'Volver al primer párrafo' : 'Siguiente párrafo'}
        onClick={handleTrailingAction}
        className={
          `flex size-9 shrink-0 items-center justify-center self-end border-0 bg-transparent p-0 ` +
          `font-editorial text-[1.75rem] leading-none text-black transition-opacity duration-200 ` +
          `md:size-10 md:text-[2rem] ` +
          `cursor-pointer opacity-100 hover:opacity-60 ` +
          `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-portfolio-lime`
        }
      >
        {atLastSlide ? '↩' : '→'}
      </button>

      <img
        src={PACMAN_SRC}
        alt=""
        draggable={false}
        aria-hidden
        className={
          `pointer-events-none absolute bottom-0 size-8 object-contain ` +
          `transition-[left] duration-300 ease-out md:size-9`
        }
        style={{
          left: pacmanLeft,
          transform: 'translateX(-50%)',
          filter: PACMAN_PINK_FILTER,
        }}
      />
    </div>
  )
}
