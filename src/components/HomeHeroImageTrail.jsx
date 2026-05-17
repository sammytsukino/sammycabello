import { distance, mix, wrap } from '@popmotion/popcorn'
import { motion, useAnimation } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { HOME_HERO_TRAIL_IMAGES_PINK } from '../data/homeHeroTrailImagesPink.js'
import {
  centerTransform,
  generateTrailImageSize,
  powerOut4,
  useAnimationLoop,
} from '../lib/imageTrailUtils.js'

function useTrailEnabled() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointerMq = window.matchMedia('(pointer: fine)')

    const apply = () => {
      setEnabled(!motionMq.matches && pointerMq.matches)
    }

    apply()
    motionMq.addEventListener('change', apply)
    pointerMq.addEventListener('change', apply)
    return () => {
      motionMq.removeEventListener('change', apply)
      pointerMq.removeEventListener('change', apply)
    }
  }, [])

  return enabled
}

function TrailImage({ position, image }) {
  const controls = useAnimation()

  useEffect(() => {
    if (!position) return
    const { xOrigin, x, yOrigin, y } = position
    controls.start({
      x: [xOrigin, x, x],
      y: [yOrigin, y, y],
      opacity: [1, 1, 0],
      scale: [1, 1, 0.2],
      transition: {
        duration: 0.8,
        ease: ['easeOut', powerOut4, powerOut4],
        times: [0, 0.7, 1],
      },
    })
  }, [position, controls])

  const box = position?.style ?? {}
  const { maxWidth, maxHeight, zIndex } = box

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={controls}
      transformTemplate={centerTransform}
      style={{ zIndex }}
      className="pointer-events-none absolute left-0 top-0 will-change-transform"
      aria-hidden
    >
      <img
        src={image.src}
        alt={image.alt ?? ''}
        draggable={false}
        style={{
          maxWidth,
          maxHeight,
          width: 'auto',
          height: 'auto',
        }}
        className="block h-auto w-auto object-contain"
      />
    </motion.div>
  )
}

export function HomeHeroImageTrail({
  containerRef,
  images = HOME_HERO_TRAIL_IMAGES_PINK,
  flavorKey = 'pink',
  distanceThreshold = 120,
}) {
  const enabled = useTrailEnabled()
  const imageCount = images.length

  const mouseInfo = useRef({
    now: { x: 0, y: 0 },
    prev: { x: 0, y: 0 },
    prevImage: { x: 0, y: 0 },
  }).current

  const imagePositions = useRef([])
  const [index, setIndex] = useState(0)

  const updateMouseFromEvent = useCallback(
    (clientX, clientY) => {
      const root = containerRef.current
      if (!root) return
      const rect = root.getBoundingClientRect()
      mouseInfo.now = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      }
    },
    [containerRef, mouseInfo],
  )

  useEffect(() => {
    if (!enabled) return
    const root = containerRef.current
    if (!root) return

    const onMove = (e) => updateMouseFromEvent(e.clientX, e.clientY)
    root.addEventListener('mousemove', onMove, { passive: true })
    return () => root.removeEventListener('mousemove', onMove)
  }, [containerRef, enabled, updateMouseFromEvent])

  const onFrame = useCallback(() => {
    if (!enabled || imageCount === 0) return

    const mouseDistance = distance(mouseInfo.now, mouseInfo.prevImage)

    mouseInfo.prev = {
      x: mix(mouseInfo.prev.x || mouseInfo.now.x, mouseInfo.now.x, 0.1),
      y: mix(mouseInfo.prev.y || mouseInfo.now.y, mouseInfo.now.y, 0.1),
    }

    if (mouseDistance > distanceThreshold) {
      const newIndex = index + 1
      const imageIndex = wrap(0, imageCount - 1, newIndex)

      imagePositions.current[imageIndex] = {
        xOrigin: mouseInfo.prev.x,
        yOrigin: mouseInfo.prev.y,
        x: mouseInfo.now.x,
        y: mouseInfo.now.y,
        style: {
          ...generateTrailImageSize(),
          zIndex: imageIndex,
        },
      }

      mouseInfo.prevImage = mouseInfo.now
      setIndex(newIndex)
    }
  }, [
    distanceThreshold,
    enabled,
    imageCount,
    index,
    mouseInfo,
  ])

  useAnimationLoop(onFrame)

  if (!enabled || imageCount === 0) return null

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden
    >
      {images.map((image, i) => (
        <TrailImage
          key={`${image.src}-${i}`}
          image={image}
          position={imagePositions.current[i]}
        />
      ))}
    </motion.div>
  )
}
