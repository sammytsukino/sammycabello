import { distance, mix, wrap } from '@popmotion/popcorn'
import { motion, useAnimation } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { HOME_HERO_TRAIL_IMAGES_PINK } from '../data/homeHeroTrailImagesPink.js'
import {
  centerTransform,
  generateTrailImageSize,
  isCompactTrailViewport,
  powerOut4,
  shouldAutoAnimateTrail,
  useAnimationLoop,
} from '../lib/imageTrailUtils.js'


const TRAIL_POOL_SIZE = 14
const TRAIL_FADE_DURATION_S = 1.15
const TRAIL_FADE_DURATION_COMPACT_S = 0.5
const MOUSE_SMOOTHING = 0.065
const MOUSE_DISTANCE_THRESHOLD = 90
const MOUSE_DISTANCE_THRESHOLD_COMPACT = 52
const AUTO_ORBIT_SPEED = 0.014
const AUTO_ORBIT_SPEED_COMPACT = 0.01

const AUTO_STEP_DISTANCE = 60
const AUTO_STEP_DISTANCE_COMPACT = 28
const IDLE_BEFORE_AUTO_MS = 200

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

function useAutoTrailAllowed() {
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const fineMq = window.matchMedia('(pointer: fine)')
    const hoverMq = window.matchMedia('(hover: hover)')
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)')

    const apply = () => {
      setAllowed(shouldAutoAnimateTrail())
    }

    apply()
    fineMq.addEventListener('change', apply)
    hoverMq.addEventListener('change', apply)
    motionMq.addEventListener('change', apply)
    return () => {
      fineMq.removeEventListener('change', apply)
      hoverMq.removeEventListener('change', apply)
      motionMq.removeEventListener('change', apply)
    }
  }, [])

  return allowed
}

function TrailImage({ position, image, fadeDuration }) {
  const controls = useAnimation()

  useEffect(() => {
    if (!position) return
    const { xOrigin, x, yOrigin, y } = position
    const travel = distance(
      { x: xOrigin, y: yOrigin },
      { x, y },
    )
    const inPlace = travel < 6

    controls.start({
      x: inPlace ? [x, x, x] : [xOrigin, x, x],
      y: inPlace ? [y, y, y] : [yOrigin, y, y],
      opacity: [1, 1, 0],
      scale: [0.92, 1, inPlace ? 0.5 : 0.4],
      transition: {
        duration: fadeDuration,
        ease: ['easeOut', [0.25, 0.1, 0.25, 1], powerOut4],
        times: [0, 0.78, 1],
      },
    })
  }, [position, controls, fadeDuration])

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

function autoPathPoint(t, width, height) {
  const cx = width / 2
  const cy = height / 2
  const rx = width * 0.26
  const ry = height * 0.22
  return {
    x: cx + Math.sin(t * 0.9) * rx + Math.sin(t * 1.6) * rx * 0.08,
    y: cy + Math.cos(t * 1.05) * ry + Math.cos(t * 1.35) * ry * 0.08,
  }
}

export function HomeHeroImageTrail({
  containerRef,
  images = HOME_HERO_TRAIL_IMAGES_PINK,
  flavorKey = 'pink',
  distanceThreshold = MOUSE_DISTANCE_THRESHOLD,
}) {
  const enabled = useTrailEnabled()
  const autoTrailAllowed = useAutoTrailAllowed()
  const imageCount = images.length

  const lastPointerMoveTimeRef = useRef(0)
  const autoTimeRef = useRef(0)
  const lastAutoSpawnRef = useRef({ x: 0, y: 0 })
  const autoPathReadyRef = useRef(false)

  const mouseInfo = useRef({
    now: { x: 0, y: 0 },
    prev: { x: 0, y: 0 },
    prevImage: { x: 0, y: 0 },
  }).current

  const imagePositions = useRef([])
  const indexRef = useRef(0)
  const [, forceUpdate] = useState(0)

  const compact = isCompactTrailViewport()
  const spawnStep = compact ? AUTO_STEP_DISTANCE_COMPACT : AUTO_STEP_DISTANCE
  const pointerThreshold = compact
    ? MOUSE_DISTANCE_THRESHOLD_COMPACT
    : distanceThreshold
  const fadeDuration = compact
    ? TRAIL_FADE_DURATION_COMPACT_S
    : TRAIL_FADE_DURATION_S

  const spawnTrailImage = useCallback(
    (x, y, xOrigin, yOrigin) => {
      indexRef.current += 1
      const slotIndex = wrap(0, TRAIL_POOL_SIZE - 1, indexRef.current)

      imagePositions.current[slotIndex] = {
        xOrigin,
        yOrigin,
        x,
        y,
        style: {
          ...generateTrailImageSize({ compact }),
          zIndex: slotIndex,
        },
      }

      mouseInfo.prevImage = { x, y }
      forceUpdate((prev) => prev + 1)
    },
    [compact, mouseInfo],
  )

  const updatePointerFromEvent = useCallback(
    (clientX, clientY) => {
      const root = containerRef.current
      if (!root) return
      const rect = root.getBoundingClientRect()
      mouseInfo.now = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      }
      lastPointerMoveTimeRef.current = Date.now()
      autoPathReadyRef.current = false
    },
    [containerRef, mouseInfo],
  )

  useEffect(() => {
    if (!enabled) return
    const root = containerRef.current
    if (!root) return

    const onMove = (e) => updatePointerFromEvent(e.clientX, e.clientY)
    const onTouch = (e) => {
      const touch = e.touches[0]
      if (touch) updatePointerFromEvent(touch.clientX, touch.clientY)
    }

    root.addEventListener('mousemove', onMove, { passive: true })
    root.addEventListener('touchstart', onTouch, { passive: true })
    root.addEventListener('touchmove', onTouch, { passive: true })
    return () => {
      root.removeEventListener('mousemove', onMove)
      root.removeEventListener('touchstart', onTouch)
      root.removeEventListener('touchmove', onTouch)
    }
  }, [containerRef, enabled, updatePointerFromEvent])

  const onFrame = useCallback(() => {
    if (!enabled || imageCount === 0) return

    const isIdle =
      Date.now() - lastPointerMoveTimeRef.current > IDLE_BEFORE_AUTO_MS

    if (autoTrailAllowed && isIdle) {
      const root = containerRef.current
      if (!root) return

      const rect = root.getBoundingClientRect()
      const w = rect.width || 390
      const h = rect.height || 844

      autoTimeRef.current += compact ? AUTO_ORBIT_SPEED_COMPACT : AUTO_ORBIT_SPEED
      const { x, y } = autoPathPoint(autoTimeRef.current, w, h)
      mouseInfo.now = { x, y }

      if (!autoPathReadyRef.current) {
        autoPathReadyRef.current = true
        lastAutoSpawnRef.current = { x, y }
        mouseInfo.prev = { x, y }
        mouseInfo.prevImage = { x, y }
        return
      }

      const stepFrom = lastAutoSpawnRef.current
      const stepDist = distance(stepFrom, { x, y })

      if (stepDist >= spawnStep) {
        spawnTrailImage(x, y, stepFrom.x, stepFrom.y)
        lastAutoSpawnRef.current = { x, y }
        mouseInfo.prev = { x, y }
      }

      return
    }

    const mouseDistance = distance(mouseInfo.now, mouseInfo.prevImage)

    mouseInfo.prev = {
      x: mix(mouseInfo.prev.x || mouseInfo.now.x, mouseInfo.now.x, MOUSE_SMOOTHING),
      y: mix(mouseInfo.prev.y || mouseInfo.now.y, mouseInfo.now.y, MOUSE_SMOOTHING),
    }

    if (mouseDistance > pointerThreshold) {
      spawnTrailImage(
        mouseInfo.now.x,
        mouseInfo.now.y,
        mouseInfo.prev.x,
        mouseInfo.prev.y,
      )
    }
  }, [
    autoTrailAllowed,
    containerRef,
    enabled,
    imageCount,
    mouseInfo,
    pointerThreshold,
    compact,
    spawnStep,
    spawnTrailImage,
  ])

  useAnimationLoop(onFrame)

  if (!enabled || imageCount === 0) return null

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden
    >
      {Array.from({ length: TRAIL_POOL_SIZE }, (_, slot) => (
        <TrailImage
          key={`${flavorKey}-trail-${slot}`}
          image={images[slot % imageCount]}
          position={imagePositions.current[slot]}
          fadeDuration={fadeDuration}
        />
      ))}
    </motion.div>
  )
}
