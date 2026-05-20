import { useAnimationFrame } from 'framer-motion'
import { createExpoIn, reversed } from '@popmotion/easing'

export const powerOut4 = reversed(createExpoIn(4))

export function useAnimationLoop(callback) {
  useAnimationFrame(callback)
}

export function centerTransform(_, generated) {
  return `translate(-50%, -50%) ${generated ?? ''}`
}

function generateNumber(base, range) {
  return base - range / 2 + Math.round(Math.random() * range)
}

export function isCompactTrailViewport() {
  if (typeof window === 'undefined') return false
  const narrow = window.matchMedia('(max-width: 63.99rem)').matches
  const coarse = !window.matchMedia('(pointer: fine)').matches
  return narrow || coarse
}

export function generateTrailImageSize({ compact } = {}) {
  const useCompact = compact ?? isCompactTrailViewport()
  const base = useCompact ? 88 : 250
  const range = useCompact ? 24 : 44
  const maxSide = generateNumber(base, range)
  return {
    maxWidth: maxSide,
    maxHeight: maxSide,
  }
}

export function shouldAutoAnimateTrail() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches
  const hasHover = window.matchMedia('(hover: hover)').matches
  return !hasFinePointer || !hasHover
}
