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

    const apply = () => {
      setEnabled(!motionMq.matches)
    }

    apply()
    motionMq.addEventListener('change', apply)
    return () => {
      motionMq.removeEventListener('change', apply)
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

  const lastMouseMoveTimeRef = useRef(0)
  const autoTimeRef = useRef(0)
  const lastAutoSpawnTimeRef = useRef(0)

  const mouseInfo = useRef({
    now: { x: 0, y: 0 },
    prev: { x: 0, y: 0 },
    prevImage: { x: 0, y: 0 },
  }).current

  const imagePositions = useRef([])
  const indexRef = useRef(0)
  const [, forceUpdate] = useState(0)

  const updateMouseFromEvent = useCallback(
    (clientX, clientY) => {
      const root = containerRef.current
      if (!root) return
      const rect = root.getBoundingClientRect()
      mouseInfo.now = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      }
      lastMouseMoveTimeRef.current = Date.now()
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

    const isIdle = Date.now() - lastMouseMoveTimeRef.current > 1000

    if (isIdle) {
      const root = containerRef.current
      if (root) {
        const rect = root.getBoundingClientRect()
        const w = rect.width || 390
        const h = rect.height || 844

        autoTimeRef.current += 0.05

        const t = autoTimeRef.current
        const cx = w / 2
        const cy = h / 2
        const rx = w * 0.35
        const ry = h * 0.28

        const x = cx + Math.sin(t * 1.8) * rx
        const y = cy + Math.cos(t * 1.8) * ry

        mouseInfo.now = { x, y }

        if (mouseInfo.prevImage.x === 0 && mouseInfo.prevImage.y === 0) {
          mouseInfo.prevImage = { x, y }
          mouseInfo.prev = { x, y }
        }

        if (Date.now() - lastAutoSpawnTimeRef.current > 380) {
          lastAutoSpawnTimeRef.current = Date.now()

          indexRef.current += 1
          const imageIndex = wrap(0, imageCount - 1, indexRef.current)

          imagePositions.current[imageIndex] = {
            xOrigin: mouseInfo.prev.x || x,
            yOrigin: mouseInfo.prev.y || y,
            x: x,
            y: y,
            style: {
              ...generateTrailImageSize(),
              zIndex: imageIndex,
            },
          }

          mouseInfo.prevImage = { x, y }
          mouseInfo.prev = { x, y }
          forceUpdate((prev) => prev + 1)
        }
      }
    } else {
      const mouseDistance = distance(mouseInfo.now, mouseInfo.prevImage)

      mouseInfo.prev = {
        x: mix(mouseInfo.prev.x || mouseInfo.now.x, mouseInfo.now.x, 0.1),
        y: mix(mouseInfo.prev.y || mouseInfo.now.y, mouseInfo.now.y, 0.1),
      }

      if (mouseDistance > distanceThreshold) {
        indexRef.current += 1
        const imageIndex = wrap(0, imageCount - 1, indexRef.current)

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
        forceUpdate((prev) => prev + 1)
      }
    }
  }, [
    containerRef,
    distanceThreshold,
    enabled,
    imageCount,
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
